import React, { useState } from 'react';
import { 
  FaCapsules, FaPlus, FaSearch, FaExclamationTriangle, 
  FaCheckCircle, FaTrash, FaBoxOpen, FaLayerGroup, FaHistory 
} from 'react-icons/fa';

const HospitalInventory = () => {
  // 1. Master Mock Database Inventory Structure
  const [inventory, setInventory] = useState([
    { id: "MED-001", name: "Tab. Paracetamol 500mg", category: "Analgesic", stock: 1250, unit: "Tablets", location: "Shelf A-3" },
    { id: "MED-002", name: "Cap. Amoxicillin 500mg", category: "Antibiotic", stock: 450, unit: "Capsules", location: "Shelf B-1" },
    { id: "MED-003", name: "Syr. Cetirizine 60ml", category: "Antihistamine", stock: 12, unit: "Bottles", location: "Dispensary Fridge 1" }, 
    { id: "MED-004", name: "Inj. Diclofenac 75mg/3ml", category: "NSAID", stock: 85, unit: "Ampoules", location: "Cabinet C" }
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  // 2. Controlled State for Intake Entry Form
  const [newMed, setNewMed] = useState({
    name: '',
    category: '', // Controlled via professional dropdown structure
    stock: '',
    unit: 'Tablets',
    location: ''
  });

  const handleChange = (e) => {
    setNewMed({ ...newMed, [e.target.name]: e.target.value });
  };

  const handleAddInventory = (e) => {
    e.preventDefault();
    if (!newMed.name || !newMed.stock || !newMed.category) return;

    const medId = `MED-${String(inventory.length + 1).padStart(3, '0')}`;
    const entry = {
      id: medId,
      name: newMed.name,
      category: newMed.category,
      stock: parseInt(newMed.stock, 10),
      unit: newMed.unit,
      location: newMed.location || "Main Pharmacy Store"
    };

    setInventory([entry, ...inventory]); // Pushes newest stock addition straight to top
    setNewMed({ name: '', category: '', stock: '', unit: 'Tablets', location: '' }); // Reset Form
  };

  const handleRemoveItem = (id) => {
    setInventory(inventory.filter(item => item.id !== id));
  };

  // Directory Search Filter Logic
  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Live Metric Synthesizers
  const totalStockItems = inventory.reduce((acc, curr) => acc + curr.stock, 0);
  const lowStockAlerts = inventory.filter(item => item.stock <= 50).length;

  return (
    <div className="w-full min-h-screen bg-slate-50/60 text-slate-800 space-y-8 p-4 md:p-6">
      
      {/* ==================== UPPER STATISTICS DECK CARD BANNER ==================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Card 1: Total Available Units */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group transition-all hover:border-slate-300">
          <div className="text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Active Units</p>
            <h3 className="text-3xl font-black text-slate-950 mt-1 font-mono tracking-tight">{totalStockItems}</h3>
          </div>
          <div className="p-4 bg-teal-50 text-[#078a72] rounded-xl text-2xl group-hover:scale-110 transition-transform">
            <FaBoxOpen />
          </div>
        </div>

        {/* Metric Card 2: Catalog Count */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group transition-all hover:border-slate-300">
          <div className="text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tracked Line items</p>
            <h3 className="text-3xl font-black text-slate-950 mt-1 font-mono tracking-tight">{inventory.length}</h3>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-xl text-2xl group-hover:scale-110 transition-transform">
            <FaLayerGroup />
          </div>
        </div>

        {/* Metric Card 3: Vulnerability Flags */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between group transition-all hover:border-slate-300">
          <div className="text-left">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Critical Shortages</p>
            <h3 className={`text-3xl font-black mt-1 font-mono tracking-tight ${lowStockAlerts > 0 ? 'text-red-600' : 'text-slate-950'}`}>
              {lowStockAlerts}
            </h3>
          </div>
          <div className={`p-4 rounded-xl text-2xl group-hover:scale-110 transition-transform ${lowStockAlerts > 0 ? 'bg-red-50 text-red-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
            <FaExclamationTriangle />
          </div>
        </div>

      </div>

      {/* ==================== CENTRAL GRID STRUCTURE LAYOUT ==================== */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
        
        {/* 📥 COLUMN 1: PROFESSIONAL REGISTRATION FORM INTAKE PANEL */}
        <div className="bg-white p-6 rounded-2xl shadow-xs border border-slate-200 text-left sticky top-24">
          <div className="pb-4 border-b border-slate-100 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#078a72]" />
              <h3 className="text-lg font-black text-slate-950 tracking-wide">Stock Entry Deck</h3>
            </div>
            <p className="text-xs text-slate-400 mt-1">Register newly arrived medical stock into hospital pharmacy directories.</p>
          </div>

          <form onSubmit={handleAddInventory} className="space-y-4">
            
            {/* Medicine Name */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Medicine Name</label>
              <input 
                type="text" 
                name="name" 
                value={newMed.name} 
                placeholder="e.g. Tab. Paracetamol 500mg" 
                onChange={handleChange} 
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all placeholder-slate-300 text-slate-950" 
                required 
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              {/* 🔄 DROPDOWN CATEGORY CLASS SELECTION */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Category Class</label>
                <select 
                  name="category" 
                  value={newMed.category} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all text-slate-950"
                  required
                >
                  <option value="">-- Select Class --</option>
                  <option value="Analgesic">Analgesic (Pain Relief)</option>
                  <option value="Antibiotic">Antibiotic</option>
                  <option value="Antihistamine">Antihistamine (Allergy)</option>
                  <option value="Antidiabetic">Antidiabetic</option>
                  <option value="Antihypertensive">Antihypertensive (BP)</option>
                  <option value="NSAID">NSAID (Anti-inflammatory)</option>
                  <option value="Antipyretic">Antipyretic (Fever)</option>
                  <option value="Vitamins/Supplements">Vitamins & Minerals</option>
                  <option value="General Store">General Medical Item</option>
                </select>
              </div>

              {/* Unit Packaging Selector */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Unit Form</label>
                <select 
                  name="unit" 
                  value={newMed.unit} 
                  onChange={handleChange} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all text-slate-950"
                >
                  <option value="Tablets">Tablets</option>
                  <option value="Capsules">Capsules</option>
                  <option value="Bottles">Bottles</option>
                  <option value="Ampoules">Ampoules</option>
                  <option value="Ointments">Ointments</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              
              {/* Quantity Count Field */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Quantity Received</label>
                <input 
                  type="number" 
                  name="stock" 
                  value={newMed.stock} 
                  placeholder="e.g. 500" 
                  onChange={handleChange} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all placeholder-slate-300 text-slate-950" 
                  required 
                />
              </div>

              {/* Storage Shelf Allocations */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">Storage Shelf Location</label>
                <input 
                  type="text" 
                  name="location" 
                  value={newMed.location} 
                  placeholder="e.g. Shelf A-3" 
                  onChange={handleChange} 
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-[#078a72] focus:outline-none transition-all placeholder-slate-300 text-slate-950" 
                />
              </div>
            </div>

            <button type="submit" className="w-full py-3.5 mt-2 bg-[#078a72] hover:bg-[#056b58] text-white font-bold text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer tracking-wide">
              <FaPlus className="text-xs" /> Save Record to Inventory
            </button>
          </form>
        </div>

        {/* 📋 COLUMNS 2 & 3: DYNAMIC PHARMACEUTICAL MATRIX DIRECTORY VIEW */}
        <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-xs border border-slate-200 text-left min-h-[550px] flex flex-col justify-between">
          <div>
            
            {/* SEARCH PANEL ARCHITECTURE */}
            <div className="flex w-full bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#078a72] transition-all mb-6">
              <div className="pl-4 flex items-center justify-center text-slate-400">
                <FaSearch />
              </div>
              <input 
                type="text" 
                placeholder="Search inventory by medicine name, therapeutic category, or code identifier..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent px-4 py-3.5 outline-none text-sm font-medium placeholder-slate-400 text-slate-950"
              />
            </div>

            {/* LIVE PHARMACY GRID DATABASE */}
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-slate-600 min-w-[600px]">
                  <thead className="text-xs font-bold text-slate-400 uppercase bg-slate-50/70 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">ID Code</th>
                      <th className="px-6 py-4">Medicine Item Designation</th>
                      <th className="px-6 py-4">Classification</th>
                      <th className="px-6 py-4">Stock Balance status</th>
                      <th className="px-6 py-4">Dispensary Location</th>
                      <th className="px-6 py-4 text-center">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredInventory.map((item) => {
                      const isLow = item.stock <= 50;
                      return (
                        <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 font-mono font-bold text-xs text-slate-400">{item.id}</td>
                          <td className="px-6 py-4 font-bold text-slate-950">
                            <div className="flex items-center gap-2.5">
                              <div className={`p-2 rounded-lg text-sm ${isLow ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-[#078a72]'}`}>
                                <FaCapsules />
                              </div>
                              <span className="truncate max-w-[180px]">{item.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-1">
                              <span className="font-mono font-bold text-slate-900">
                                {item.stock} <span className="text-xs text-slate-400 font-sans font-medium">{item.unit}</span>
                              </span>
                              {isLow ? (
                                <span className="text-[10px] text-red-600 font-bold flex items-center gap-1">
                                  <span className="w-1 h-1 rounded-full bg-red-600 inline-block animate-ping" /> Reorder Alert
                                </span>
                              ) : (
                                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                                  ✓ Stable
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500">{item.location}</td>
                          <td className="px-6 py-4 text-center">
                            <button 
                              onClick={() => handleRemoveItem(item.id)} 
                              className="text-slate-300 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                            >
                              <FaTrash className="text-xs" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                    {filteredInventory.length === 0 && (
                      <tr>
                        <td colSpan="6" className="text-center py-12 text-sm text-slate-400 italic font-medium">
                          No matching pharmaceutical records matches current search settings.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* REAL TIME ENGINE FOOTER STATUS BAR */}
          <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-center gap-2 font-medium">
            <span className="flex items-center gap-1.5">
              <FaHistory className="text-[10px]" /> Real-time database synchronizer active
            </span>
            <span className="bg-slate-50 px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600">
              Total Catalog Lines: <strong className="font-mono text-slate-900">{inventory.length}</strong>
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default HospitalInventory;