import React, { useState } from 'react';
import { Home, Brain, List, Users } from 'lucide-react';

const TelegramMiniApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [score, setScore] = useState(0);
  const [tasks, setTasks] = useState({
    youtube: false,
    telegram: false,
    twitter: false
  });
  const [invites, setInvites] = useState(0);

  const handleTaskComplete = (task, points) => {
    if (!tasks[task]) {
      setTasks({ ...tasks, [task]: true });
      setScore(score + points);
    }
  };

  const handleInvite = () => {
    // In a real app, this would generate and copy a unique invite link
    alert("Invite link copied! (simulated)");
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="flex flex-col items-center">
            <div className="w-36 h-36 rounded-full bg-yellow-300 shadow-lg mb-8" /> {/* Moon */}
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-2xl font-bold">Score: {score}</span>
            </div>
          </div>
        );
      case 'riddle':
        return (
          <div className="flex justify-center items-center h-full">
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
              <span>Riddle Image Placeholder</span>
            </div>
          </div>
        );
      case 'tasks':
        return (
          <div className="flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-yellow-300 shadow-lg mb-4" /> {/* Moon */}
            <h2 className="text-xl font-bold mb-4">Perform Tasks</h2>
            <div className="space-y-4 w-full max-w-md">
              <TaskItem
                image="/api/placeholder/50/50"
                text="Subscribe to our YouTube"
                points={50}
                completed={tasks.youtube}
                onComplete={() => handleTaskComplete('youtube', 50)}
              />
              <TaskItem
                image="/api/placeholder/50/50"
                text="Follow our channel"
                points={25}
                completed={tasks.telegram}
                onComplete={() => handleTaskComplete('telegram', 25)}
              />
              <TaskItem
                image="/api/placeholder/50/50"
                text="Follow our X"
                points={20}
                completed={tasks.twitter}
                onComplete={() => handleTaskComplete('twitter', 20)}
              />
            </div>
          </div>
        );
      case 'friend':
        return (
          <div className="flex flex-col items-center">
            <div className="w-full h-44 bg-gray-200 mb-4">
              <span>Friend Banner Image</span>
            </div>
            <h2 className="text-xl font-bold mb-4">Invite Friends ({invites})</h2>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleInvite}
            >
              Invite Friend
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex-grow overflow-y-auto">
        {renderContent()}
      </div>
      <nav className="bg-black bg-opacity-50 rounded-t-lg p-4">
        <ul className="flex justify-around">
          <NavItem icon={<Home />} text="Home" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
          <NavItem icon={<Brain />} text="Riddle" active={activeTab === 'riddle'} onClick={() => setActiveTab('riddle')} />
          <NavItem icon={<List />} text="Tasks" active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')} />
          <NavItem icon={<Users />} text="Friend" active={activeTab === 'friend'} onClick={() => setActiveTab('friend')} />
        </ul>
      </nav>
    </div>
  );
};

const NavItem = ({ icon, text, active, onClick }) => (
  <li className={`flex flex-col items-center ${active ? 'text-white' : 'text-gray-400'}`} onClick={onClick}>
    {icon}
    <span className="text-xs mt-1">{text}</span>
  </li>
);

const TaskItem = ({ image, text, points, completed, onComplete }) => (
  <div className="flex items-center bg-white bg-opacity-50 rounded-lg p-4">
    <img src={image} alt="Task" className="w-12 h-12 mr-4" />
    <div className="flex-grow">
      <p>{text}</p>
      <div className="flex items-center">
        <img src="/api/placeholder/20/20" alt="Points" className="w-5 h-5 mr-1" />
        <span>+{points}</span>
      </div>
    </div>
    <button
      className={`px-3 py-1 rounded ${completed ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
      onClick={onComplete}
      disabled={completed}
    >
      {completed ? '✓' : 'Check'}
    </button>
  </div>
);

export default TelegramMiniApp;
