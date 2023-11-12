import React, { useState,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import './design.css'

const CreateBoard = () => {
  const navigate=useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [boards, setBoards] = useState([]);
  const [createdBoard, setCreatedBoard] = useState(null);

  const [selectedBoard, setSelectedBoard] = useState(null);
  const [boardData, setBoardData] = useState({});



  useEffect(() => {
    
    fetchBoards();
  }, []);

  const handleBoardSelect = (board) => {
    
    setSelectedBoard(board);
    navigate(`/columns/${board._id}`);
  };



  const handleDeleteBoard = async (boardId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/boards/${boardId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete board');
      }

      // Fetch updated list of boards
      fetchBoards();
    } catch (error) {
      console.error('Error deleting board:', error.message);
    }
  };




  
  const handleResetBoardData = (boardId) => {
    setBoardData((prevData) => {
      const updatedData = { ...prevData };
      delete updatedData[boardId];
      return updatedData;
    });
  };
  
  
  const handleUpdateBoard = async (boardId) => {
    try {
      
      const updatedFields = {};
  
     
      if (boardData[boardId]?.name !== undefined && boardData[boardId]?.name.trim() !== '') {
        updatedFields.name = boardData[boardId]?.name;
      }
  
      // Include description if it has a value
      if (boardData[boardId]?.description !== undefined && boardData[boardId]?.description.trim() !== '') {
        updatedFields.description = boardData[boardId]?.description;
      }
  
      const response = await fetch(`http://localhost:8000/api/v1/boards/${boardId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update board');
      }
  
      // Fetch updated list of boards
      fetchBoards();
  
      // Reset 
      handleResetBoardData(boardId);
    } catch (error) {
      console.error('Error updating board:', error.message);
    }
  };
  





  const fetchBoards = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/boards');
      if (!response.ok) {
        throw new Error('Failed to fetch boards');
      }

      const data = await response.json();
      setBoards(data.boards);
    } catch (error) {
      console.error('Error fetching boards:', error.message);
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error('Failed to create board');
      }

      const data = await response.json();
      console.log(data);

     
      setCreatedBoard(data.board);
      // Fetch updated list of boards
      fetchBoards();


      // Reset 
      setName('');
      setDescription('');
    } catch (error) {
      console.error('Error creating board:', error.message);
    }
  };

  return (
   
    <div>
      <h2 className='kanban'>Kanban Board List</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <br></br>
          <input className='smaller' type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Description:
          <br></br>
          <input className='smaller' value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <br />
        <button className='button-1' type="submit">Create Board</button>
      </form>

      {createdBoard && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h3>Created Board</h3>
          <p>Name: {createdBoard.name}</p>
          <p>Description: {createdBoard.description}</p>
        </div>
      )}



<div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
        {boards.map((board) => (
          <div key={board._id} style={{ border: '2px solid #1B263B', 
          borderRadius: '8px', 
          padding: '10px',
          margin: '10px',
          backgroundColor: '#E0E1DD', }}>
            <h3>{board.name}</h3>
            <p>{board.description}</p>
            <button className='button-1' onClick={() => handleBoardSelect(board)} style={{ marginRight: '10px' }}>Add Column</button>
            <button className='button-1' onClick={() => handleDeleteBoard(board._id)}>Delete Board</button>
            <div>
              <label>
                Name:
                
                <input type="text" value={boardData[board._id]?.name || ''} onChange={(e) => setBoardData(prev => ({ ...prev, [board._id]: { ...prev[board._id], name: e.target.value } }))} />
              </label>
              <br />
              <label>
                Description:
                <br></br>
                
                <input value={boardData[board._id]?.description || ''} onChange={(e) => setBoardData(prev => ({ ...prev, [board._id]: { ...prev[board._id], description: e.target.value } }))} />
              </label>
              <br />
              <button className='button-1' onClick={() => handleUpdateBoard(board._id)}>Update Board</button>
            </div>
          </div>
        ))}
      </div>


    </div>
    
  );
};

export default CreateBoard;
