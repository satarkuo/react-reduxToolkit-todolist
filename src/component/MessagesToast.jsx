import { useSelector } from "react-redux";

const MessagesToast = () => {
    const messages = useSelector( state => {
        return state.messages
    
    })
    

    return (<div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1000 }}>
        {messages?.map((message, index) => (
            <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true" key={message.id}>
                <div className={`toast-header text-white bg-${message.type}`} >
                    <strong className="me-auto">{message.title}</strong>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss='toast'
                        aria-label="Close"
                    ></button>
                </div>
                <div className="toast-body">{message.text}</div>
            </div>
        ))}
        
    </div>
    )
}
export default MessagesToast;