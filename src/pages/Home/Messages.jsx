import { useEffect, useRef, useState } from 'react';
import { img } from '../../assets';
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../lib/firebase/firebase';
import { useAuth } from '../../hooks/use-auth';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { TiTick } from 'react-icons/ti';
import { createdAt } from '../../utils';
import useTheme from '../../hooks/use-theme';

const Messages = ({ currentUser, chatId, handleLastMessage, isDarkMode }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const scrollRef = useRef();
  const [messages, setMessages] = useState([]);

  const [file, setFile] = useState('');
  const [text, setText] = useState('');
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'userChats', user?.uid), doc => {
      setChats(doc.data());
    });
    return () => unsub();
  }, [user.uid, currentUser?.uid]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'chats', chatId), doc => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unsub();
    };
  }, [chatId]);

  useEffect(() => {
    handleLastMessage(chats, chatId);
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, handleLastMessage, chats, chatId]);

  const handleSend = async e => {
    e.preventDefault();
    if (!text && !file) return;
    if (file) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        err => {
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            const message = {
              file: downloadURL,
              id: uuid(),
              senderId: user.uid,
              createdAt: Timestamp.now(),
            };
            await updateDoc(doc(db, 'chats', chatId), {
              messages: arrayUnion(message),
            });
            setText('');
            setFile('');
          });
        }
      );
    } else {
      const message = {
        text,
        file,
        id: uuid(),
        senderId: user.uid,
        createdAt: Timestamp.now(),
      };
      await updateDoc(doc(db, 'chats', chatId), {
        messages: arrayUnion(message),
      });
    }
    await updateDoc(doc(db, 'userChats', user.uid), {
      [`${chatId}.lastMessage`]: {
        text,
      },
      [`${chatId}.date`]: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [`${chatId}.lastMessage`]: {
        text,
      },
      [`${chatId}.date`]: serverTimestamp(),
    });
    setText('');
    setFile('');
  };
  return (
    <div className="flex-1 flex flex-col pb-4">
      <div
        key={chats[chatId]}
        className={`flex items-center justify-center ${
          isDarkMode ? 'bg-darker text-white' : 'bg-light text-black'
        } py-3`}>
        <img
          src={chats[chatId]?.userInfo?.photoURL}
          alt="avatar"
          className="w-12 h-12 rounded-[50%] mr-4 object-cover"
        />
        <span className="font-bold text-xl">
          {chats[chatId]?.userInfo?.displayName}
        </span>
      </div>

      <div
        className="h-4/5 px-3 overflow-x-hidden py-3 flex flex-col gap-4"
        ref={scrollRef}>
        {messages.map(m => {
          const isMe = m?.senderId === user.uid;
          return (
            <div
              key={m?.id}
              className="flex flex-col gap-6">
              <div
                className={`flex ml-3 ${
                  isMe ? 'flex-row-reverse' : 'flex-row'
                } gap-4 items-start`}>
                <div className="mr-4 flex flex-col w-max">
                  <img
                    src={isMe ? user.photoURL : currentUser.photoURL}
                    alt="avatar"
                    className="w-16 h-16  rounded-[50%] object-cover "
                  />
                  <span className="text-gray-300 text-sm w-fit whitespace-nowrap">
                    {createdAt(m)}
                  </span>
                </div>
                {m?.text && (
                  <p
                    className={`${
                      isMe ? 'bg-main text-white' : 'bg-light text-gray-800'
                    } p-4 rounded-b-xl rounded-${isMe ? 'tl-xl' : 'tr-xl'}`}>
                    {m?.text}
                  </p>
                )}
              </div>
              {m?.file && (
                <img
                  src={m?.file}
                  alt="image-message"
                  className={`self-${
                    isMe ? 'end' : 'start'
                  } w-48 h-48 text-left rounded-lg object-cover border-${
                    isMe ? 'main' : 'light'
                  } border-8`}
                />
              )}
            </div>
          );
        })}
      </div>
      <form
        className="flex px-4 gap-4 items-center flex-1"
        onSubmit={handleSend}>
        <input
          onChange={e => setText(e.target.value)}
          value={text}
          type="text"
          placeholder="Type something ..."
          className={`w-full font-medium text-lg p-2 ${
            isDarkMode && 'bg-darker'
          } rounded-lg border-2 focus:outline-main`}
        />
        <label htmlFor="file">
          <img
            src={img}
            alt="img"
            className="w-8 h-8 rounded-[50%] cursor-pointer"
          />
        </label>
        <input
          id="file"
          type="file"
          className="hidden"
          accept="image/*"
          src={img}
          onChange={e => {
            setFile(e.target.files[0]);
          }}
        />
        {file && (
          <div>
            <TiTick className="text-green-600 text-2xl inline " />
            <span className="text-green-600 text-sm whitespace-nowrap">
              Uploaded Succesfully
            </span>
          </div>
        )}
        <button className="bg-main hover:bg-main-dark text-white p-2 rounded-lg">
          send
        </button>
      </form>
    </div>
  );
};
export default Messages;
