import { addAvatar, img } from '../../assets';

const Messages = () => {
  return (
    <div className="flex-1 flex flex-col pb-4">
      <div className="flex items-center justify-center bg-light py-3">
        <img
          src={addAvatar}
          alt="avatar"
          className="w-12 h-12 rounded-[50%] mr-4"
        />
        <span className="font-bold text-xl">Ali</span>
      </div>
      <div className="h-4/5 px-3 overflow-x-hidden py-3 flex flex-col gap-4">
        <div className="flex ml-3">
          <div className="mr-4 flex flex-col w-max">
            <img
              src={addAvatar}
              alt="avatar"
              className="w-16 h-16  rounded-[50%] object-cover "
            />
            <span className="text-gray-300 text-sm w-fit whitespace-nowrap">
              just Now
            </span>
          </div>
          <p className="bg-light text-gray-800 p-4 rounded-b-xl rounded-tr-xl">
            hello my name is khaled Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatem non ab, laudantium error quos dicta
            ullam consequuntur atque corporis quae explicabo alias cupiditate
            delectus molestiae consectetur sed ut suscipit tenetur?
          </p>
        </div>
        <div className="flex ml-3 flex-row-reverse">
          <div className="ml-4 flex flex-col w-max">
            <img
              src={addAvatar}
              alt="avatar"
              className="w-16 h-16  rounded-[50%] object-cover "
            />
            <span className="text-gray-300 text-sm w-fit whitespace-nowrap">
              just Now
            </span>
          </div>
          <p className="bg-main text-white p-4 rounded-b-xl rounded-tl-xl">
            hello my name is khaled Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatem non ab, laudantium error quos dicta
            ullam consequuntur atque corporis quae explicabo alias cupiditate
            delectus molestiae consectetur sed ut suscipit tenetur?
          </p>
        </div>
        <div className="flex ml-3">
          <div className="mr-4 flex flex-col w-max">
            <img
              src={addAvatar}
              alt="avatar"
              className="w-16 h-16  rounded-[50%] object-cover "
            />
            <span className="text-gray-300 text-sm w-fit whitespace-nowrap">
              just Now
            </span>
          </div>
          <p className="bg-light text-gray-800 p-4 rounded-b-xl rounded-tr-xl">
            hello my name is khaled Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatem non ab, laudantium error quos dicta
            ullam consequuntur atque corporis quae explicabo alias cupiditate
            delectus molestiae consectetur sed ut suscipit tenetur?
          </p>
        </div>
        <div className="flex ml-3 flex-row-reverse">
          <div className="ml-4 flex flex-col w-max">
            <img
              src={addAvatar}
              alt="avatar"
              className="w-16 h-16  rounded-[50%] object-cover "
            />
            <span className="text-gray-300 text-sm w-fit whitespace-nowrap">
              just Now
            </span>
          </div>
          <p className="bg-main text-white p-4 rounded-b-xl rounded-tl-xl">
            hello my name is khaled Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatem non ab, laudantium error quos dicta
            ullam consequuntur atque corporis quae explicabo alias cupiditate
            delectus molestiae consectetur sed ut suscipit tenetur?
          </p>
        </div>
        <div className="flex ml-3">
          <div className="mr-4 flex flex-col w-max">
            <img
              src={addAvatar}
              alt="avatar"
              className="w-16 h-16  rounded-[50%] object-cover "
            />
            <span className="text-gray-300 text-sm w-fit whitespace-nowrap">
              just Now
            </span>
          </div>
          <p className="bg-light text-gray-800 p-4 rounded-b-xl rounded-tr-xl">
            hello my name is khaled Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatem non ab, laudantium error quos dicta
            ullam consequuntur atque corporis quae explicabo alias cupiditate
            delectus molestiae consectetur sed ut suscipit tenetur?
          </p>
        </div>
        <div className="flex ml-3 flex-row-reverse">
          <div className="ml-4 flex flex-col w-max">
            <img
              src={addAvatar}
              alt="avatar"
              className="w-16 h-16  rounded-[50%] object-cover "
            />
            <span className="text-gray-300 text-sm w-fit whitespace-nowrap">
              just Now
            </span>
          </div>
          {/* <p className="bg-main text-white p-4 rounded-b-xl rounded-tl-xl">
            hello my name is khaled Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Voluptatem non ab, laudantium error quos dicta
            ullam consequuntur atque corporis quae explicabo alias cupiditate
            delectus molestiae consectetur sed ut suscipit tenetur?
          </p> */}
          <img
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgVFhUYGBgYGBgYGBgaGBgYGBgYGBgZGhgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHzQrJCs0NDQ0NDY0NDQ0NDQ0NDQ0NDQ0NDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAAEDBAUGBwj/xABBEAACAQIDBAcHAgMHAwUAAAABAgADEQQhMQUSQVEGMmFxgZHRIkJSkqGxwRMUguHwFSNTYnKisgczQyQlRMLS/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECAwQFBv/EACYRAAICAQQCAgIDAQAAAAAAAAABAhEDEhMxUSFBBGEyoRRxkSL/2gAMAwEAAhEDEQA/ANJaklV5RV5Mjz6E8MuAwtwGV0eTo4iGiviK6Iyq7KrPkgJsWItkPMecNqU57pK4OKwg5PfzdPSdSTJjK20aONJPspNTg/pmWykW7KJopfpxWlwpAZIDKxEYrJmSAwgBDaPDMaIAbxRzGMAFeKNFeACijXivEAxEaPeKADARFYUV4wIisErLFoDLFQWVyIBlhhIysmhkUUdlgmMBQ1kd4LV1GrKPERWKizeKU/3qfGnzL6xQtBpZoAwlaRCGJVkUWFeSq8qqZIDKsKMHbgDYzDqcxkf99/xOpDzk9oG+Oo9gX7tOoVplDl/2bS/Ff0TBoQeQ3jb00Myffi35DvRi0B2SkiMQJVfFINXUeIkb7QQZ3J7lY/iK0FMtNTkbJK52hyRj8o+5gfv2JICDLm3oIakOmWSsEypVxT2JugsPhJ/MF2c++fAKPxFqQUWyY4My26wu7WsT1iOI5WgO9IdZl/ia/wBzJ1j0mozgakDvIkZxKfGvgQftM1MVSXeN11ysOFhyiba9IG28T3KYta7HofTL/wC6Thc9ysfxF+65I58APuZlptZANGOvAcSTzgNtteCHxIi3I9j25dFrH7WZCiimbu1s2Ayy5X5y0az/AAr8x/8AzOY2ntHfemd22419b3zB5dktPtx+CL9TI3Vb8lvE6VI3RVf/ACDwY/kQadV2AJZRcXyT1MwztipyXyPrIP7UqAABhkLaCG9H7DZl9HSFWPvt4BB+JBWQ2676qNQNWA4DtnPvtOp8f0X0kL7Rc61Dw962mcTzxGsMjpmw45uf439YDYVeV+8k/czl22i3GqfnPrImxw41P9/85Lzx6Hsy7OlxGGQDqL1k90cWAhbqDgo8hORbFpxYecE4tPiEn+Quitl1ydf+ovxL5iNOQ/ep8X0PpGh/IQbDPSVWSKJVbFj3VY5kaWGXfn9JGu0GIvZV11Jb0nVrRyaGaISH+nMI7TFvaq27FsOPZnK/9qUwM95zc658TbNjyieWKKWOQONqL+/Q3BAUXIz4Ny75vHHpewDHwt97cpxNfG/+o/VUAWtkTlbdtnJqu38yd9F0GWel+/nMVmUbvs3licqro619oNlZBmbZt2E6AdnOC+Ke3WA7l9SZw9bpBf32PcCPSVX2wD7rN3mS/kxGvjs7o4sWBarwHvAfa0rfvaQvvNvZn4my8Zw7bXbgg8STI22nUPEDw9ZD+Ui18f7O4O00DAgHQjQDiPSRVdr3BATUakzh2xlQ++fCwkbVHOrt5mQ/kyLWCJ29XbD8Ag78/wAyu+2SPfQX16s4wr2xWEl55DWGKOqfbg41fL+QkDbaTi7n5pzuUIESXlkytuKNo7YTkx8P5yF9qqfcPmBMq8ff7JLnLselGi22DwT6/wApGdquTfdX6yjvRt6LU+x6UXjtSp/lHhIjtGp8Q8hKheS4fDs5yyHMxapMKSLeGxDtvbzE200y1lY4h/jbzlqnhmQNc3uPsDMvePOU20lYJJtk5qOffbzMAk8z5mR37Yr9siyqDKxbsC/b9Yr9sAD3Y27Bv2xrxAFaK0G8aAw4oFooAdE/SFtA7kZ5DLWUqm1ydF+Y3mYwI1FvCW8PsvEVLblCq4OhVHIPiBaaPJNkKEUE20ah4gdw9ZC+Kc6ufO32m1h+hGPf/wCOyjm7Kv0Jv9Jp0P8Aptij12pJ/EzHyC2+sFGcvTB6Uc4x/uc88h/ylAEaATr8J0Z38QcGz9W4LqPhUPkD5Tcq/wDT6hTR3L1GKKzC5UC6gkZAdk0eKT8onXFHm7oy6raBvTUZN5wJ6j0X2PQOGpu1GnvEEFtxbndYgE5a2Akxw6n4Y3OkeNgk6Z92cnTBVW6tOoe5GP2E94TBIOqqr3ACEcMOE2XxV7f6M3nfR4hS6P4ptKFTxXd/5Wlul0Qxbf8Ai3f9ToPsZ7H+17ZG9AiWviw7ZDzz6R5WnQbEnX9Nf4ifsssJ0BrcaqDwY+k9JNONuS18bGQ80zz5egDccQvgh/LSZegica7eCAfcmdyUgNTlLBj6JeafZxq9BqPGpUPyD8SVeheGGpc/xAfYTqmoGRmiZWzDpCeWfZzi9EsMPcY97t6yRejWGH/iB72Y/mbppHlI2pnlHtw6X+E65ds4XpNs+mjIiU0UEbxIHta2tc8JnUUtN/pOn94v+j8mYxW048iSk6OuDbirHw1mqICLguoPI3IynbDZNH/Bp/IvpOMwSnfQ2OTrnbTMTuRUvoZthqnZjmu1RD/ZtH/CT5F9I42fTGlNPkX0ku/FvzfwYWwBhEHuJ8o9IX6K/AvyiEHjb0dIXkieivwjyEA0V+EeQk7PIi8VAQmmOQ8hAKjkPKSu8hdoDQNhyigb0UQHCYXE2sDZhxDC4ntvR3Ho9CmKbIQqIpVWvuEKPZtqLTwJGIl/B4mxBBKsNLGx8DPPxZK8M9CUb4PoUVDxUww68QfKeY7G6YuoCVWJ5Px/iHHvnV0NtFgCGDA6EEETrVS4MXNx5MXYxVtr1SdL1PooE7TbVFP29YhhlSqHX/I0872Hi/8A3Co/M1PqZ1e2NoXw9UW1puPNSJOltWmXuRXho8nop/eDx+09k6MYNjhKR5qT5s08epL7fnPbuim0aS4WipJBCAHzMxUpRVxVmsVCX5BVMMw4SuykTo0xlE++PE/ykeISmwNmXQ8RGvktfkmD+PGX4s5/fMcG81aGySyKb3uqnUZkgRxsNzyE0Xycb9mT+PJdf6ZQpKfetBbCr8X0mhX2Q6i+Vu+VXwrgXOnYRKWaMuGJ4pJcFRsPyN5EyGTI9765Mw8jaPeaqRi4lRhbWc9iultBHKe0SMrAE/Ya9k3dtVAlCo3JG+ot+Z5HsoFsVSPPEUh4mosyyZXGki4Yk7bO7fpbSGqOv+pXH/0iXpjhuLW8G/IE9KxG0qa/9yoiZHrOBpbme2ZWJ6Q4PP8AvVfsRTUP+0GLdl7Mk4vhfs8x21tOjWcOlZAAoHtGxvcnl2zOuPcam7cAHQnyJnoG0ekuHZKgTD1Hsre0MObKQp6xK+zbtnjuGwjuBuoW62Y52FvI5+M58svPd9HVhd/Vdm5WxNVcmUg8t5fWDS2lUQ3a45cvPSSUH3UUVaZLKKt2IvctSAp3I5OL5nQ6c1VagQDa1v2+8vt2cbh/cWJ0O+F48cpOhcpm+4+GjQwm3zcA5zpsHXRxdTnxHGcNtTZyUz+pQffonj7yE+641tybw7zwG0ipBBlQzSxyp+UZzwRyK14Z3pUQGtK2A2ktQANYN9D/ADlp6c7ozUlaOCcHB0yJjI2MJ0MiZTHZJG0iaSskjZYDRFaKFuRRDPNbRBDwh2j2nknpFnDYojJvP1mrhNotTO9TdRfMoSN1vDge0TDYkZHh5x2caEXmkZtEuKZ1OyMei1mqOwQMG1uQCxvbKbOO23TdHRaitvKQACc78M5w+KeyDvH2kWEqe2JtvNPSZPEn/wBGvTNnv3zv9jYtRSQXGSgWuL+U87pt7UpV39tu8wWXR5objqVHsyV+REKtWO42Y6rfYzxunjnXqu47mPrLtHpBiFBAqsQQQQc9e+P+TF+iFjkuGeuYbaDoibrkeyNOQQn8S8u1KpH/AHDbvnk9DpTiCAtkYAWB3TyK5m/IzWw226yr7QTM9vs3lLRLzX6G3Nez0Q7We4Ba/fY/iQrtBnUFgDkDy+08+xHSCumYpA2vncsM+OUzW6W4keyCq2Fup6yXtxfH6KU8jXJ6Vg64IJ3F6787ddu2WWqL8C+F8vrPJV6TYkCwfiT1RqSSfqTGPSXE/wCJ9BE8kfsFqXR6B0pcfta1svY/Inji1bHLL2gb903MRtus6lHclWFiOYMyf0gG3gc734fYiZzmpNUVFVdna9FOkTIEQ4Wk+628HKKjtqPbe3tdbX/LO9xvTAqtkw6uQASoqbvy3SxF8uE8bo7SqoLK4+RST3mE22K5YNvi4Nx7A8Qc9JeqDXm7I0O/VHV47pQ4p4pRhrfqo7sS9v09/dp2Hs+3YuvKcjszajboTgtrC/8AlVSR37ovLD7QxD03UlCtRd1vZztvA5XbI3UTEfCuuV/sON+fOZ5HbtGuKNcI6hMWMybcresKqi1EZFCKSVO9ui/sqVAvqBY8Jyi4lhkbzUweK7ZKkzVpMEu9Jt03VvoR+RAc+3v2XM3yAA8ANJuI6Ou44BH27QeEjobLVDdW3hwvqPWKn6DV2LCErwtfznQ4DHBlIZgCDbMgEiZKUwJXxeIpU7NUQtfIEC9uPMf0JvielnPmWtHStik+NfmEhfGJ8afMJzH9rYT/AAz8v85Eu0cLck0zYnLLQWGWvO833V2jn2n0zp2xifGnzCRNjE+NPmEwf32EPuHyPrB/dYT4fo3rDdXaDa+mb37tPjX5hFOZqV6FzZcuGsUe59oraRgxXjxTzTrFeMTHjwAuYzqeIlSg1mEt4rq+MqLTJ0E0m/JK4NOkTvayo7e0e8ybDYZ/DmeHjJwiJn12J7lv3amU4uSEQUsKWz0HM6DxlvDYVSd1RvnidEHrJkw7PYubLy0HgOE0KVNVFgLDlKhjQmwsNh1XUgn7dwlh0G7ckG5tbskOcKoPZAm/BBFh8ZuNuPpf2Tr4Xlqvh6b6qL/WZ2Joh17QMpFg8T7jm1sgTw7DJuvDBr2iSvsge40za2CdeF+6bpQxFef5kyhFgm0c0wI1ygkzoamFB5fjylGts7l9PQzJ436LUjMLQGeWKuEYfzyPpKlVCuoImbTRSNTC5oBzv95E+EJ9/wAxCwnUX+uMnCzVRTSsSk1wZFTDso4GMlSXcVoe4ylhEvdT3iRKOnguMr5LtDFGauDxJmOqW4S3QPKKNlM22NxcTL20l6R7CD6/QmWKFWSYgBlK8wR5y27RFUcbFJGWxIOoNvKRnxmQxXjQ9zK9x3RitoADeKPuxQAK0cCJVJ0kqYYnWCTYEUkSgx4S/h8J2Wk5dVGWZ+ktY/bJciFKJOq5dukNFRL8eXLykT1y2kkw2FLG5/rumnL8Ej7zvkNP60lrD4QLmczJ0QLpDWaKPYrFu3MmB7YN4SyhDs0JjwvGXUQnPHtjACnrY6XzlDGUN038D6y7v2MZwCPvJkrQeyHA4v3GOXA8uwy+yTEq0yhsfAy9gcZb2H04Hl2GSn6CS9ot2jESVh3QfCUTZE1MGQNglOhI+3lLdo1oh2Zb4JhoL9oy+kgqBtBr2jSbVu2C6A6i8VDswBh3A9oHPU2vIS4Q5Lbv7ZvnDW6rEfaV62GJ1AYdnpJlHwNMzSL5jlGSraTmmFyFx2HhK2IHGY00za7Vl1K4MsfqZTFR5oYZ75R2CM7aKgOTbrZ+v1Eq7829o4W6b1s1z8OMwiRJYhj3x4gsIoeMQAxQrdkUKA1KeH8B2+klDoumZ+kqPid7l+ICAmbWlwZ12TVsUT29g0gLTLa+Uko0L/kzRw9ID1jUWwboioYUcf675bXKMW5RLNEq4JEJKO+BlHuIwDEkykagQsowCUxMuUSD7RmtACNxDW3nAcjtjBoABiEBUjjqpmcuWVpquuh8ZTxiWsw45GRJDRPgcXb2X04Hl39k0yJzoMv4HGWsjacDy7O6EZEyj7RpFYJMJpGxEolAtAvHZoxaIscRWjBuwxb/ADBgAz0wdReYuKolGseqeqfx3zc3+wyDELvqV3de7I8DFKKaHGVGCyWhUqloLggkHhIne2c5jY1xixu5zm6gAY20vl3Qq2IJy4SGJuwLNKrlawvJN8HrDylNTLlKkzC6kHmOIgm2SwM40k/Tf4YowssIgEtUqN8zlFRp2ltJvGJk2GiWEJmgF415YEghCAseMAgY4GcGEsAJBGaMDHjAIaRjGEV4AMYNo94JiAkQ5WgNxB0goLHUx3zi5Q3S4M6p7LEZj63HC0QN5dq0iwyyI07ZQVjpy1EzfgZp4DHW9h9OB5dhmmy8RObl/Z+P3fYY5cDy7O6WpemTKPtF9lgGT1DykDLHQkx4oEctAYzZZ3kZrrYm4NgSbEHSc9tuqxqFScltYcMxrMyZSy06otR8FypjN67NqSTbsOkqu5MCNMW7NB40UUQDiTYaput2aGQxCCdAbln7fMR5jrXYaE+cU01IjSzoVsId5CDDBnQZBx1giFAYW9CvAvFACQGEDI1hXhYB3jqYBMeOwDvBJjEwSYMArxjGvGJiAImPAvb7QlMACU8JVxtD3x4iTtJVNxFJAmZIMcwsTT3W1yOkjkFF/AY7dsrHLgeXYZqub5znDLWDxu7ZW6vDs7+yWpdkuPs02EEyQwGEYkYHSGjmrjTqn7j8zEnaYiiGUqwuD/V5y2PwDUznmp0b8HkZhkj5s1jL0U4oopkWKKKKACjxooAPFFFADoxCEiUyQGdhzkgMcGRgwhAArxxBLRxAZJeNvRoN4AHeOpkcdYASloxMjVso94AFeIwbxiYgCaK8AmODCwJbwVexjKYzRgHiKe+LZcxMgOQbHUfTwmlqRn9cvKRY3DDrj+LXzmbKRWDRRDxv9DGJgBbwWNK2VurwPL+U1C3Gc8wlzAYzd9hurwPKNS7E0ahkGKoh1ZTxHkeBliw8DAYSmhJnFVEKkgixBsRBmxt7D2YOOOTd40+n2mPOWUadGydoUUUUQxRRRQAUUUUAOgWHFFOv0c4QhCKKACWGsUUYPkRjCPFAYo4/EUUSAZdBHMUUAEYxiigAowiiiASwooowBGo75YbQ90UUlgjJXqxl4xRRFMYxHSPFJGbGC6i9/wCBJWiimseCDO2v/wBpvD/kJzUUUwy8mkOBooopkWKKKKADxRRRgf/Z"
            alt="image-message"
            className="w-48 h-48 rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="flex px-4 gap-4 items-center flex-1">
        <input
          type="text"
          placeholder="Type something ..."
          className="w-full font-medium text-lg p-2 rounded-lg border-2 focus:outline-main"
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
        />
        <button className="bg-main hover:bg-main-dark text-white p-2 rounded-lg">
          send
        </button>
      </div>
    </div>
  );
}
export default Messages