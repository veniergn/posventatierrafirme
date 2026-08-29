import React, { useState } from 'react';
import { ContactItem } from '../../types';
import { Plus, Edit2, Trash2, Save, X, MessageCircle, Mail, PhoneCall } from 'lucide-react';

interface ContactsManagementProps {
  contacts: ContactItem[];
  onAddContact: (contact: ContactItem) => void;
  onUpdateContact: (contact: ContactItem) => void;
  onDeleteContact: (id: string) => void;
}

export const ContactsManagement: React.FC<ContactsManagementProps> = ({
  contacts,
  onAddContact,
  onUpdateContact,
  onDeleteContact
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState<Partial<ContactItem>>({});

  const handleEdit = (contact: ContactItem) => {
    setEditingId(contact.id);
    setFormData(contact);
    setIsAdding(false);
  };

  const handleAddNew = () => {
    setIsAdding(true);
    setEditingId(null);
    setFormData({
      category: 'Tierra Firme',
      preferredChannel: 'whatsapp'
    });
  };

  const handleSave = () => {
    if (!formData.name || !formData.role || !formData.phone) {
      alert('Por favor complete al menos el nombre, rol y teléfono.');
      return;
    }

    if (isAdding) {
      onAddContact({
        id: `c-${Date.now()}`,
        name: formData.name,
        role: formData.role,
        phone: formData.phone,
        email: formData.email || '',
        category: formData.category as ContactItem['category'],
        preferredChannel: formData.preferredChannel as ContactItem['preferredChannel']
      });
      setIsAdding(false);
    } else if (editingId) {
      onUpdateContact({
        ...(formData as ContactItem)
      });
      setEditingId(null);
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'whatsapp': return <MessageCircle className="w-4 h-4 text-green-600" />;
      case 'email': return <Mail className="w-4 h-4 text-blue-600" />;
      case 'call': return <PhoneCall className="w-4 h-4 text-gray-600" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-[#1B1C1E]">Directorio de Contactos</h2>
          <p className="text-sm text-[#5B5F63]">Gestione los contactos visibles en el portal público de clientes.</p>
        </div>
        <button
          onClick={handleAddNew}
          disabled={isAdding}
          className="bg-[#8E1E19] hover:bg-[#6D0205] text-white px-4 py-2 rounded-lg font-bold text-sm shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <Plus className="w-4 h-4" /> Nuevo Contacto
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E0E3E7] overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#FAF9FB]">
            <tr>
              <th className="px-6 py-3 text-left text-[10px] font-extrabold text-[#5B5F63] uppercase tracking-wider">Nombre & Rol</th>
              <th className="px-6 py-3 text-left text-[10px] font-extrabold text-[#5B5F63] uppercase tracking-wider">Categoría</th>
              <th className="px-6 py-3 text-left text-[10px] font-extrabold text-[#5B5F63] uppercase tracking-wider">Datos de Contacto</th>
              <th className="px-6 py-3 text-right text-[10px] font-extrabold text-[#5B5F63] uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isAdding && (
              <tr className="bg-blue-50/50">
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <input 
                      type="text" 
                      placeholder="Nombre Completo" 
                      className="w-full text-sm border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Rol o Puesto" 
                      className="w-full text-xs border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                      value={formData.role || ''}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    className="w-full text-sm border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  >
                    <option value="Tierra Firme">Tierra Firme (Post-Venta)</option>
                    <option value="FOWN Propiedades">FOWN Propiedades (Ventas)</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-2">
                    <input 
                      type="text" 
                      placeholder="Teléfono / WhatsApp" 
                      className="w-full text-sm border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <input 
                      type="email" 
                      placeholder="Email (opcional)" 
                      className="w-full text-xs border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                    <select
                      className="w-full text-xs border-gray-300 rounded-md mt-1"
                      value={formData.preferredChannel}
                      onChange={(e) => setFormData({...formData, preferredChannel: e.target.value as any})}
                    >
                      <option value="whatsapp">Prefiere WhatsApp</option>
                      <option value="call">Prefiere Llamadas</option>
                      <option value="email">Prefiere Email</option>
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <button onClick={handleSave} className="text-green-600 hover:text-green-900 mr-3">
                    <Save className="w-5 h-5" />
                  </button>
                  <button onClick={() => setIsAdding(false)} className="text-gray-400 hover:text-gray-900">
                    <X className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            )}

            {contacts.map((contact) => (
              editingId === contact.id ? (
                <tr key={contact.id} className="bg-blue-50/50">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <input 
                        type="text" 
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                      <input 
                        type="text" 
                        className="w-full text-xs border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                        value={formData.role || ''}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="w-full text-sm border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                    >
                      <option value="Tierra Firme">Tierra Firme (Post-Venta)</option>
                      <option value="FOWN Propiedades">FOWN Propiedades (Ventas)</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <input 
                        type="text" 
                        className="w-full text-sm border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                        value={formData.phone || ''}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                      <input 
                        type="email" 
                        className="w-full text-xs border-gray-300 rounded-md focus:ring-[#8E1E19] focus:border-[#8E1E19]"
                        value={formData.email || ''}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                      <select
                        className="w-full text-xs border-gray-300 rounded-md mt-1"
                        value={formData.preferredChannel}
                        onChange={(e) => setFormData({...formData, preferredChannel: e.target.value as any})}
                      >
                        <option value="whatsapp">Prefiere WhatsApp</option>
                        <option value="call">Prefiere Llamadas</option>
                        <option value="email">Prefiere Email</option>
                      </select>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button onClick={handleSave} className="text-green-600 hover:text-green-900 mr-3">
                      <Save className="w-5 h-5" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-gray-400 hover:text-gray-900">
                      <X className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={contact.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-[#1B1C1E]">{contact.name}</div>
                    <div className="text-xs text-[#5B5F63] mt-0.5">{contact.role}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      contact.category === 'Tierra Firme' ? 'bg-[#FFDAD5] text-[#8A1B17]' : 'bg-[#094262]/10 text-[#094262]'
                    }`}>
                      {contact.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-[#1B1C1E]">
                      {getChannelIcon(contact.preferredChannel)}
                      {contact.phone}
                    </div>
                    {contact.email && (
                      <div className="text-xs text-[#5B5F63] mt-1">{contact.email}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <button onClick={() => handleEdit(contact)} className="text-[#8E1E19] hover:text-[#6D0205] mr-3">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => { if(window.confirm('¿Eliminar contacto?')) onDeleteContact(contact.id); }} className="text-gray-400 hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
        {contacts.length === 0 && !isAdding && (
          <div className="p-8 text-center text-gray-500 text-sm">
            No hay contactos registrados.
          </div>
        )}
      </div>
    </div>
  );
};
