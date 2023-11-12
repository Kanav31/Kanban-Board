import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './design.css'
const ColumnScreen = () => {
  const { boardId } = useParams();
  const [columns, setColumns] = useState([]);
  const [columnName, setColumnName] = useState('');
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemDueDate, setItemDueDate] = useState('');
  const [items, setItems] = useState([]);
  




  const handleDragStart = (e, itemId) => {
    e.dataTransfer.setData('text/plain', itemId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, targetColumnId) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');

    try {
      const response = await fetch(`http://localhost:8000/api/v1/boards/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ column: targetColumnId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item column');
      }

      
      fetchItems(targetColumnId);
    } catch (error) {
      console.error('Error updating item column:', error.message);
    } 
  };




  useEffect(() => {
    fetchColumns();
  }, [boardId]);


  const fetchColumns = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/boards/boards/${boardId}/columns`);
      if (!response.ok) {
        throw new Error('Failed to fetch columns');
      }

      const data = await response.json();
      setColumns(data.columns);
    } catch (error) {
      console.error('Error fetching columns:', error.message);
    }
  };



  const fetchItems = async (columnId) => {
    console.log(columnId);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/boards/boards/${boardId}/items`);
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }

      const data = await response.json();
      setItems(data.items);
    } catch (error) {
      console.error('Error fetching items:', error.message);
    }
  };




  const handleItemSubmit = async (e, columnId) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/boards/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: itemName,
          description: itemDescription,
          dueDate: itemDueDate,
          column: columnId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create item');
      }

      // Fetch updated list of items after adding an item
      fetchItems(columnId);

      // Reset 
      setItemName('');
      setItemDescription('');
      setItemDueDate('');
    } catch (error) {
      console.error('Error creating item:', error.message);
    }
  };
 

  

  const handleColumnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/boards/columns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: columnName, board: boardId }),
      });

      if (!response.ok) {
        throw new Error('Failed to create column');
      }

      const data = await response.json();
      console.log(data);

      
      fetchColumns();

      // Reset 
      setColumnName('');

    } catch (error) {
      console.error('Error creating column:', error.message);
    }
  };


  const handleDeleteColumn = async (columnId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/boards/columns/${columnId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete column');
      }
      fetchColumns();
    } catch (error) {
      console.error('Error deleting column:', error.message);
    }
  };

  const handleDeleteItem = async (itemId, columnId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/boards/items/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete item');
      }
      fetchItems(columnId);
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };



  const handleUpdateItem = async (itemId, columnId) => {
    try {
      
      const updatedFields = {};

    
      if (itemName.trim() !== '') {
        updatedFields.name = itemName;
      }

    
      if (itemDescription.trim() !== '') {
        updatedFields.description = itemDescription;
      }

      
      if (itemDueDate.trim() !== '') {
        updatedFields.dueDate = itemDueDate;
      }

      const response = await fetch(`http://localhost:8000/api/v1/boards/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      fetchItems(columnId);

      setItemName('');
      setItemDescription('');
      setItemDueDate('');
    } catch (error) {
      console.error('Error updating item:', error.message);
    }
  };





  return (
    <div>
      <h2 className='kanban'>Kanban Board Columns</h2>
      <form onSubmit={handleColumnSubmit}>
        <label>
          Enter Column Name:
          <br></br>
          <input className='smaller' type="text" value={columnName} onChange={(e) => setColumnName(e.target.value)} />
        </label>
        <br />
        <button className='button-1' type="submit">Add Column</button>
      </form>


      <div style={{ display: 'flex' }}>
        {columns.map((column) => (
          <div
            key={column._id}
            style={{
              border: '2px solid #1B263B', 
              borderRadius: '8px', 
              padding: '10px',
              margin: '10px',
              backgroundColor: '#E0E1DD',
            }}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={(e) => handleDrop(e, column._id)}
          >
            <h3>{column.name}</h3>
            
          <form onSubmit={(e) => handleItemSubmit(e, column._id)}>
            <label>
              Item Name:
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Item Description:
              <input
                type="text"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Due Date:
              <input
                type="date"
                value={itemDueDate}
                onChange={(e) => setItemDueDate(e.target.value)}
              />
            </label>
            <br />
            <button className='button-1' type="submit">Add Item</button>
          </form>

          {/* Display items */}
          <h4>Items:</h4>
          {items
          
            .filter((item) => {
                console.log('item.column:', item.column._id);
                console.log('column._id:', column._id);
                return item.column._id === column._id;
              })
            
            .map((item) => (
                
              <div key={item._id} draggable
              onDragStart={(e) => handleDragStart(e, item._id)}
               style={{ border: '2px solid black', borderRadius: '5px', padding: '10px', margin: '5px' }}>
                <p>Name: {item.name}</p>
                <p>Description: {item.description}</p>
                <p>Due Date: {item.dueDate}</p>
                {/* Delete button for the item */}
                 <button className='button-1'
              onClick={() => {
                console.log('Item ID to delete:', item._id);
                handleDeleteItem(item._id, column._id);
              }}
            >
              Delete Item
            </button>


            <div>
            <label>
              Item Name:
              <input
                type="text"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </label>
            <br />
            <label>
              Item Description:
              <input
                type="text"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
              />
            </label>
            <br />
            <label>
              Due Date:
              <input
                type="date"
                value={itemDueDate}
                onChange={(e) => setItemDueDate(e.target.value)}
              />
            </label>
            <br />
              <button className='button-1' onClick={() => handleUpdateItem(item._id,column._id)}>Update Item</button>
            </div>



              </div>
            ))}
           

{/* Delete button for the column */}
<button className='button-1'
  onClick={() => {
    console.log('Column ID to delete:', column._id);
    handleDeleteColumn(column._id);
  }}
>
  Delete Column
</button>




          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnScreen;
