import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  sub: {
    id: string;
  };
}

const Dashboard = () => {
  const [notes, setNotes] = useState<string>('');
  const [saveStatus, setSaveStatus] = useState<string>('');

  useEffect(() => {
    // Load notes from database on component mount
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      const userId = decodedToken.sub.id;

      const response = await axios.get(`http://localhost:3001/programs/${userId}`);
      if (response.data) {
        setNotes(response.data.programDescription);
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNotes = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const decodedToken = jwtDecode<CustomJwtPayload>(token);
      const userId = decodedToken.sub.id;

      // if the user id is found in the table, update the notes, otherwise create a new record using @Get
      const response = await axios.get(`http://localhost:3001/programs/${userId}`);
      if (response.data) {
        await axios.patch(`http://localhost:3001/programs/${userId}`, {
          programDescription: notes
        });
        setSaveStatus('Updated successfully!');
        setTimeout(() => setSaveStatus(''), 3000);
        return;
      }

      await axios.post('http://localhost:3001/programs', {
        userId: userId,
        programDecription: notes
      });
      
      setSaveStatus('Saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      console.error('Error saving notes:', error);
      setSaveStatus('Error saving notes');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(event.target.value);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Workout Notes</h2>
        <div className="flex items-center gap-4">
          <span className={`w-full text-sm ${saveStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {saveStatus}
          </span>
          <Button className="w-full bg-white text-black hover:bg-neutral-300" onClick={saveNotes}>
            <Plus className="mr-2 h-4 w-4" /> Save Notes
          </Button>
        </div>
      </div>
      <textarea
        className="w-full h-[60vh] text-black text-sm p-4 border rounded-lg resize-none focus:outline-none focus:ring-2"
        value={notes}
        onChange={handleNotesChange}
        placeholder="Write your workout notes here..."
      />
    </div>
  );
};

export default Dashboard;
