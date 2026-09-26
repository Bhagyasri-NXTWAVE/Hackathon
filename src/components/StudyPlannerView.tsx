import React, { useState } from 'react';
import { Calendar, Plus, CheckCircle2, Clock, Flame, BarChart2, Check, X, RotateCcw } from 'lucide-react';
import { StudyTask, StudentProfile } from '../types';

interface StudyPlannerViewProps {
  profile: StudentProfile;
}

export const StudyPlannerView: React.FC<StudyPlannerViewProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'today' | 'weekly' | 'monthly'>('today');
  const [tasks, setTasks] = useState<StudyTask[]>([]);

  const [newTaskSubject, setNewTaskSubject] = useState('');
  const [newTaskTopic, setNewTaskTopic] = useState('');
  const [newTaskMinutes, setNewTaskMinutes] = useState(45);
  const [newTaskSlot, setNewTaskSlot] = useState<'Morning' | 'Afternoon' | 'Evening'>('Morning');
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleComplete = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTopic.trim()) return;

    const newTask: StudyTask = {
      id: Date.now().toString(),
      subject: newTaskSubject || 'General Preparation',
      topic: newTaskTopic,
      durationMinutes: newTaskMinutes,
      timeOfDay: newTaskSlot,
      completed: false,
      date: '2026-08-08'
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskSubject('');
    setNewTaskTopic('');
    setShowAddModal(false);
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const completionPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] border border-slate-800 shadow-md text-white space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold mb-2">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              <span>AI Study Schedule Engine</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
              AI Study Planner
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Organized for your {profile.dailyStudyHours || 3}-hour daily target.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>

        {/* Progress & Streak Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Daily Task Completion</span>
            <span className="text-xl font-bold text-white">{completionPercent}%</span>
            <div className="w-full h-1.5 bg-slate-700 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${completionPercent}%` }} />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Tasks Completed</span>
            <span className="text-xl font-bold text-emerald-400">{completedCount} / {tasks.length}</span>
            <p className="text-[10px] text-slate-400 mt-1">Today’s Schedule</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Consistency Streak</span>
            <span className="text-xl font-bold text-rose-400 flex items-center gap-1">
              7 Days 🔥
            </span>
            <p className="text-[10px] text-slate-400 mt-1">Keep it going!</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        {(['today', 'weekly', 'monthly'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold capitalize transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {tab}'s Plan
          </button>
        ))}
      </div>

      {/* Today's Tasks */}
      {activeTab === 'today' && (
        <div className="space-y-4">
          {['Morning', 'Afternoon', 'Evening'].map(slot => {
            const slotTasks = tasks.filter(t => t.timeOfDay === slot);
            return (
              <div key={slot} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  {slot} Slot
                </h3>

                {slotTasks.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No tasks scheduled for this slot.</p>
                ) : (
                  <div className="space-y-2">
                    {slotTasks.map(task => (
                      <div
                        key={task.id}
                        className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                          task.completed
                            ? 'bg-slate-50 border-slate-200 text-slate-400'
                            : 'bg-white border border-slate-200 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => toggleComplete(task.id)}
                            className={`w-6 h-6 rounded-lg flex items-center justify-center border transition-colors ${
                              task.completed
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 hover:border-blue-600'
                            }`}
                          >
                            {task.completed && <Check className="w-4 h-4" />}
                          </button>
                          <div>
                            <p className={`text-xs sm:text-sm font-semibold ${task.completed ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                              {task.topic}
                            </p>
                            <span className="text-[10px] text-slate-500">
                              {task.subject} • {task.durationMinutes} mins
                            </span>
                          </div>
                        </div>

                        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${
                          task.completed ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {task.completed ? 'Completed' : 'Pending'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 w-full max-w-md rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Custom Study Task</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={addTask} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. Operating Systems / AP Economy"
                  value={newTaskSubject}
                  onChange={e => setNewTaskSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Topic / Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Process Synchronization PYQs"
                  value={newTaskTopic}
                  onChange={e => setNewTaskTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Duration (Minutes)</label>
                  <input
                    type="number"
                    min="15"
                    max="180"
                    value={newTaskMinutes}
                    onChange={e => setNewTaskMinutes(parseInt(e.target.value) || 45)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">Time Slot</label>
                  <select
                    value={newTaskSlot}
                    onChange={e => setNewTaskSlot(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
              >
                Save Task
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
