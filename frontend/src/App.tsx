import { useState, useEffect, useRef } from 'react'
import { Menu, Send } from 'lucide-react'
import styles from './App.module.css'
import { Modal } from './components/Modal'

export default function Component() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<any>([])
  const [showModal, setShowModal] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [disabled, setDisabled] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (question.trim() !== '') {
      setMessages([...messages, { type: 'question', content: question }])
      setDisabled(true)
      await fetch(`http://localhost:3000/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      })
      .then((response) => response.json())
      .then((data) => {
        setMessages((prevMessages: any) => [
          ...prevMessages,
          { type: 'answer', content: data.answer.response },
        ])
        setDisabled(false)
      })
      setQuestion('')
    } else {
      alert('No se puede enviar una pregunta vacía')
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (question.trim() !== '') {
        handleSubmit(e);
      } else {
        alert('No se puede enviar una pregunta vacía');
      }
    }
  };

  const showModalHandler = () => {
    setShowModal(!showModal)
  }

  return (
    <div className={`${styles.background}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.containerHeader}`}>
          <img src="./logo_r.png" alt="Logo" />
          <h1>Chatbot de Jujutsu</h1>
        </div>
        <div className={`${styles.containerContent}`}>
        <div className={`${styles.message} ${styles.answer}`}>
              Bienvenido a nuestro ChatBot!, Carga un pdf para probar
            </div>
          {messages.map((message: any, index: any) => (
            <div key={index} className={`${styles.message} ${styles[message.type]}`}>
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className={`${styles.containerFooter}`}>
          <div className={`${styles.menu}`} onClick={showModalHandler}>
            <Menu size={20} strokeWidth={2} />
          </div>
          <form onKeyDown={handleKeyDown}>
            {
              disabled ?
              <input
                type="text"
                placeholder="Escribe tu pregunta sobre jujutsu..."
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                className={`${styles.input} ${styles.disabled}`}
                disabled
              />
              :
              <input
                type="text"
                placeholder="Escribe tu pregunta sobre jujutsu..."
                onChange={(e) => setQuestion(e.target.value)}
                value={question}
                className={`${styles.input}`}
              />
            }
          </form>
          <div className={`${styles.send}`} onClick={handleSubmit}>
            <Send color="#000" size={20} strokeWidth={2} />
          </div>
        </div>
      </div>
      {showModal && <Modal showModalHandler={showModalHandler} />}
    </div>
  )
}
