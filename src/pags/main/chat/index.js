import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Chat({ws}) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate()
  const current_user_id = localStorage.getItem('user') 
 
  const [users,setUsers] = useState([])
  const [userDetails,setUserDetails] = useState({
    "username":null,
    "email":null
  })

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get("http://localhost:8000/messages");
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };


  const DeleteMessage = async(message_id)=>{
    
    try {
      const response = await axios.delete(`http://localhost:8000/message/${message_id}`);
      ws.send("")
    } catch (error) {
      alert("Something Went Wrong While Deleting")
    }

  }

 const getCurrentUserDetails = async()=>{
  try {
    const response = await axios.get(`http://localhost:8000/user/${current_user_id}`);
    setUserDetails({username:response.data.user.username,email:response.data.user.email})
  } catch (error) {
    console.log(error)
  }
 }


 const getAllUsers = async()=>{
  try {
    
    const response = await axios.get(`http://localhost:8000/get_all_users/`);
   
    setUsers(response.data.users)
  } catch (error) {
    console.log(error)
  }
 }


  const sendMessage = () => {
    ws.send(newMessage);
   
    setNewMessage('')
  };


  useEffect(()=>{
   
    getCurrentUserDetails()
  },[])
  useEffect(()=>{
    ws.onmessage = (e) => {
      const parse = JSON.parse(e.data)
      console.log(parse)
      if(parse.message == "" || parse.type_offline){
       getAllUsers()
      }
      fetchMessages()
    };
  },[ws])
  
  return (
    <div className="container">
    <h1 className="mt-4">Chat Room</h1>
  
    <div className="d-flex">
      <div className="border mr-2 mt-4 overflow-auto" style={{ flex: '1',height:490,borderRadius:3 }}>
        <h4 style={{ marginLeft: 12 }}>Group Users</h4>
        {users.map((data, index) => {
          if (data.id != current_user_id) {
            return (
              <div
                className="p-2 border"
                key={index}
                style={{ display: 'flex', flexDirection: 'row' }}
              >
                <strong>{data.username}</strong>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: data.online ? 'green' : 'red',
                    marginTop: 10,
                    marginLeft: 10,
                    borderRadius: '100%',
                  }}
                ></div>
              </div>
            );
          }
          return null;
        })}

      </div>
  
      <div className="flex-grow-1">
      
  
        <div className="card mt-4">
          <div className="card-body">
            <div className="overflow-auto" style={{ height: 400 }}>
              {messages.map((message, index) => (
                <div key={index} className="mb-2">
                  <strong>
                    {message.sender_id == current_user_id || message.sender == 'You'
                      ? 'You'
                      : message.sender + ' '}
                    :
                  </strong>{' '}
                  {message.content}{' '}
                  {message.sender_id == current_user_id ? (
                    <button className="btn btn-danger" 
                    onClick={() => DeleteMessage(message.id)}
                    style={{ fontSize: '9px', padding: '5px 10px' }}
                    >
                      Delete
                    </button>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <div className="input-group-append">
                <button className="btn btn-warning" onClick={sendMessage}>
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="border p-2" style={{width:'38.5%',marginTop:20,borderRadius:3}}>
      <h4 style={{textAlign:'center'}}>{userDetails.username}</h4>
    <button className="btn btn-danger" onClick={()=>{
      localStorage.removeItem('user')
      window.location = '/login'
    }} style={{width:'100%'}}>Logout</button>

    </div>

  </div>
  
  );
}

export default Chat;
