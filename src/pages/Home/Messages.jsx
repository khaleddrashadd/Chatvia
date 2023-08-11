import { useEffect, useRef, useState } from 'react';
import { img } from '../../assets';
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db, storage } from '../../lib/firebase/firebase';
import { useAuth } from '../../hooks/use-auth';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { TiTick } from 'react-icons/ti';
import { BsFillMicFill } from 'react-icons/bs';
import { BiSend } from 'react-icons/bi';
import { createdAt } from '../../utils';
import { createPortal } from 'react-dom';
import Modal from '../../components/Modal';
import { handleUpdateDoc } from '../../lib/firebase/handle-firebase-data';

const Messages = ({ currentUser, chatId, handleLastMessage }) => {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const scrollRef = useRef();
  const audioRef = useRef();
  const [messages, setMessages] = useState([]);

  const [file, setFile] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(null);
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'userChats', currentUser?.uid), doc => {
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
      const storageRef = ref(storage, 'image-message/' + uuid());
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        () => {},
        err => {
          setError(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            const message = {
              file: downloadURL,
              id: uuid(),
              senderId: user.uid,
              createdAt: Timestamp.now(),
            };

            await handleUpdateDoc('chats', chatId, {
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
      await handleUpdateDoc('chats', chatId, {
        messages: arrayUnion(message),
      });
    }
    await handleUpdateDoc('userChats', user.uid, {
      [`${chatId}.lastMessage`]: {
        text,
      },
      [`${chatId}.date`]: serverTimestamp(),
    });

    await handleUpdateDoc('userChats', currentUser.uid, {
      [`${chatId}.lastMessage`]: {
        text,
      },
      [`${chatId}.date`]: serverTimestamp(),
    });
    setText('');
    setFile('');
  };

  const handleRecord = async () => {
    if (!navigator && navigator.mediaDevices) return;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      audioRef.current = new MediaRecorder(stream);
      audioRef.current.start();
      audioRef.current.ondataavailable = e => {
        const audioBlob = new Blob([e.data], { type: 'audio/wav' });
        const file = new FormData();
        file.append('voice', audioBlob);

        const storageRef = ref(storage, 'voices/' + uuid());
        const uploadTask = uploadBytesResumable(storageRef, audioBlob);
        uploadTask.on(
          'state_changed',
          () => {},
          err => {
            setError(err);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async downloadUrl => {
              await handleUpdateDoc('chats', chatId, {
                messages: arrayUnion({
                  voiceUrl: downloadUrl,
                  senderId: user.uid,
                  id: uuid(),
                  createdAt: Timestamp.now(),
                }),
              });
            });
          }
        );
      };
    } catch (err) {
      setError(err);
    }
  };
  const handleSendRecord = () => {
    audioRef.current.stop();
  };
  return (
    <div className="flex-1 flex flex-col pb-4">
      <div
        key={chats[chatId]}
        className="flex items-center justify-center dark:bg-darker dark:text-white bg-light text-black py-3">
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
              {m?.voiceUrl && (
                <audio
                  src={m?.voiceUrl}
                  controls="button"
                  controlsList="nodownload"
                  className={`w-48 ${isMe ? 'self-end' : 'slef-end'}`}
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
          className="w-full font-medium text-lg p-2 dark:bg-darker dark:text-white rounded-lg border-2 focus:outline-main"
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
        {(text || file) && (
          <button className="bg-main hover:bg-main-dark text-white p-2 rounded-lg">
            <BiSend />
          </button>
        )}
        {!file && !text && (
          <button
            onMouseDown={handleRecord}
            onMouseUp={handleSendRecord}
            onTouchStart={handleRecord}
            onTouchEnd={handleSendRecord}
            className="bg-main hover:bg-main-dark text-white p-2 rounded-lg focus:animate-pulse">
            <BsFillMicFill />
          </button>
        )}
      </form>
      {error &&
        createPortal(
          <Modal
            title="Error"
            content={error?.message ?? 'Something Went Wrong'}
            onClick={() => setError(null)}
          />,
          document.getElementById('overlay')
        )}
    </div>
  );
};
export default Messages;
