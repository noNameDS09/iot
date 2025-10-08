// models/event.js

// --- WatermelonDB Server-Side Simulation ---

let events = [
  { id: 1, title: "Maintenance check", date: "2025-10-20" },
  { id: 2, title: "Energy audit", date: "2025-10-30" },
  { id: 3, title: "Quarterly Report Submission", date: "2025-11-05" },
];

let nextId = events.length + 1;

// Helper function to simulate asynchronous network/DB delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const EventModel = {
  /**
   * Reads upcoming events. Must be async.
   */
  getUpcoming: async () => { 
    await delay(100);
    
    const today = new Date().toISOString().split('T')[0]; 
    const upcoming = events
        .filter(event => event.date >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return upcoming;
  },

  /**
   * Creates a new event record. Must be async.
   */
  create: async (title, date) => {
    await delay(100);
    
    const newEvent = { id: nextId++, title, date };
    events.push(newEvent);
    
    return newEvent;
  },

  /**
   * Updates an existing event record. Must be async.
   */
  update: async (id, title, date) => {
    await delay(100);
    
    const index = events.findIndex(e => e.id === id);
    if (index === -1) return null;
    
    events[index] = { id, title, date };
    
    return events[index];
  },

  /**
   * Deletes an event record. Must be async.
   */
  delete: async (id) => {
    await delay(100);
    
    const initialLength = events.length;
    events = events.filter(e => e.id !== id);
    const wasDeleted = events.length < initialLength;
    
    return wasDeleted;
  },
};

module.exports = EventModel;