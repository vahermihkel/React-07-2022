import { useRef } from "react";

function AboutUs() {
  const nameRef = useRef();
  const emailRef = useRef();
  const feedbackRef = useRef();

  const sendEmail = () => {
    window.Email.send({
      Host : "smtp.elasticemail.com",
      Username : "vahermihkel@gmail.com",
      Password : "D94047B38286C3FF2B1BBBD493F85E8CBB08",
      To : 'vahermihkel@gmail.com',
      From : "vahermihkel@gmail.com",
      Subject : "This is the subject",
      Body : `SUlle saadetid e-mail ${nameRef.current.value} poolt
      (tema e-mail: ${emailRef.current.value}), tema sõnum:
      ${feedbackRef.current.value}
      `
    }).then(
      message => alert(message)
    );
  }

  return ( <div>Meist leht
    <label>Sinu nimi</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <label>Sinu email</label> <br />
    <input ref={emailRef} type="text" /> <br />
    <label>Sinu tagasiside meile</label> <br />
    <input ref={feedbackRef} type="text" /> <br />
    <button onClick={sendEmail}>Saada e-mail</button>
  </div> );
}

export default AboutUs;