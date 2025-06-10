import React, { useState } from 'react';
import { Gift as GiftType } from '../types';
import GiftForm from './GiftForm';
import {
  PlusCircle,
  Download,
  Edit,
  Trash2,
  Settings,
  Package,
  BarChart3,
  X,
  ChevronRight,
  Grid3X3,
  List,
  Eye,
  Users,
  DollarSign,
  Activity,
  Calendar,
  Heart,
  Sparkles,
  ArrowLeft,
} from 'lucide-react';
import { exportToPdf } from '../helpers/export.helper';
import { api } from '../services/api';

interface AdminSidebarProps {
  gifts: GiftType[];
  onAddGift: (gift: Omit<GiftType, 'id' | 'createdAt' | 'status'>) => void;
  onUpdateGift: (id: string, gift: Partial<GiftType>) => void;
  onDeleteGift: (id: string) => void;
  giftToEdit: GiftType | null;
  onCancelEdit: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  gifts = [],
  onAddGift,
  onUpdateGift,
  onDeleteGift,
  giftToEdit,
  onCancelEdit,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<'dashboard' | 'manage' | 'form' | null>(null);
  const [showExportMessage, setShowExportMessage] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const stats = {
    total: gifts.length,
    available: gifts.filter(g => g.status === 'available').length,
    reserved: gifts.filter(g => g.status === 'reserved').length,
    totalValue: gifts.reduce((sum, g) => sum + (g.price || 0), 0),
    averagePrice: gifts.length > 0 ? gifts.reduce((sum, g) => sum + (g.price || 0), 0) / gifts.length : 0,
    reservationRate: gifts.length > 0 ? (gifts.filter(g => g.status === 'reserved').length / gifts.length) * 100 : 0
  };

  const handleExport = async () => {
    if (!gifts || gifts.length === 0) {
      alert('Nenhum presente encontrado para exportar');
      return;
    }
    setIsExporting(true);
    try {
      await exportToPdf(gifts);
      setShowExportMessage(true);
      setTimeout(() => setShowExportMessage(false), 3000);
    } finally {
      setIsExporting(false);
    }
  };

  const handleSubmit = async (giftData: Omit<GiftType, 'id' | 'createdAt' | 'status'>) => {
    await onAddGift(giftData);
    setActivePanel(null);
    setIsOpen(false);
  };

  const handleUpdate = async (id: string, gift: Partial<GiftType>) => {
    const response = await api.updateGift(id, gift);
    console.log('Update response:', response);
    if (window.confirm('Tem certeza que deseja atualizar este presente?')) {
      await onUpdateGift(id, gift);
    }

    await onUpdateGift(id, gift);
  };

  const handleDelete = async (id: string) => {
    const response = await api.deleteGift(id);
    console.log('Delete response:', response);
    if (window.confirm('Tem certeza que deseja excluir este presente?')) {
      onDeleteGift(id);
    }
  };

  const openPanel = (panel: 'dashboard' | 'manage' | 'form') => {
    setActivePanel(panel);
    setIsOpen(true);
  };

  const closePanel = () => {
    setActivePanel(null);
    setIsOpen(false);
    onCancelEdit();
  };

  const backToMenu = () => {
    setActivePanel(null);
  };

  return (
    <>
      {/* Floating Admin Button - Responsivo */}
      <div className="fixed right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-gradient-to-br from-rose-400 via-pink-400 to-rose-500 hover:from-rose-500 hover:via-pink-500 hover:to-rose-600 text-white rounded-full p-3 md:p-4 shadow-2xl transition-all duration-300 transform hover:scale-110 group backdrop-blur-sm border border-white/20"
        >
          <div className="relative">
            <Settings className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-500" />
            <Sparkles className="w-2.5 h-2.5 md:w-3 md:h-3 absolute -top-1 -right-1 text-yellow-200 animate-pulse" />
          </div>
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity duration-300"
          onClick={closePanel}
        />
      )}

      {/* Sidebar Principal - Z-index alto para ficar na frente */}
      <div className={`fixed right-0 top-0 h-full w-full sm:w-[400px] md:w-[600px]   bg-white/95 backdrop-blur-xl shadow-2xl border-l border-rose-100 transform transition-all duration-500 ease-out z-[60] ${isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>

        {/* Conteúdo da Sidebar - Só mostra quando não há painel ativo */}
        {!activePanel && (
          <>
            {/* Sidebar Header */}
            <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 border-b border-rose-200">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 to-pink-400/10"></div>
              <div className="relative flex items-center justify-between p-4 md:p-6">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="bg-gradient-to-br from-rose-400 to-pink-500 p-2 md:p-2.5 rounded-xl shadow-lg">
                    <Heart className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-base md:text-lg font-bold text-gray-800">Painel Admin</h2>
                    <p className="text-xs text-rose-600 font-medium">Gestão de Presentes</p>
                  </div>
                </div>
                <button
                  onClick={closePanel}
                  className="p-2 rounded-lg hover:bg-white/50 transition-colors group"
                >
                  <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                </button>
              </div>
            </div>

            {/* Quick Stats - Grid responsivo */}
            <div className="p-4 md:p-6 border-b border-rose-100">
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-rose-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-rose-600 text-ellipsis font-roboto-mono  uppercase tracking-wide">Total</p>
                      <p className="flex justify-start text-xl md:text-2xl font-bold text-rose-800">{stats.total}</p>
                    </div>
                    <Package className="h-5 w-5 md:h-6 md:w-6 text-rose-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-emerald-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-600 text-ellipsis font-roboto-mono uppercase tracking-wide">Disponíveis</p>
                      <p className="flex justify-start text-xl md:text-2xl font-bold text-emerald-800">{stats.available}</p>
                    </div>
                    <Eye className="h-5 w-5 md:h-6 md:w-6 text-emerald-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-amber-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className=" text-amber-600 text-ellipsis font-roboto-mono  uppercase tracking-wide">Reservados</p>
                      <p className="flex justify-start text-xl md:text-2xl font-bold text-amber-800">{stats.reserved}</p>
                    </div>
                    <Users className="h-5 w-5 md:h-6 md:w-6 text-amber-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-purple-200/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-600 text-ellipsis font-roboto-mono uppercase tracking-wide">Valor</p>
                      <p className="flex justify-start text-base md:text-lg font-bold text-purple-800">R$ {stats.totalValue.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                    </div>
                    <DollarSign className="h-5 w-5 md:h-6 md:w-6 text-purple-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Menu - Melhor espaçamento mobile */}
            <div className="p-4 md:p-6 space-y-2 md:space-y-3">
              <button
                onClick={() => openPanel('dashboard')}
                className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-rose-200 active:scale-95"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="p-2 md:p-2.5 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all">
                    <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Dashboard</p>
                    <p className="text-xs text-gray-500">Estatísticas detalhadas</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => openPanel('manage')}
                className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-rose-200 active:scale-95"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="p-2 md:p-2.5 rounded-lg bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-600 group-hover:from-emerald-200 group-hover:to-green-200 transition-all">
                    <List className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Gerenciar</p>
                    <p className="text-xs text-gray-500">Editar presentes</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={() => openPanel('form')}
                className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-rose-200 active:scale-95"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="p-2 md:p-2.5 rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 text-rose-600 group-hover:from-rose-200 group-hover:to-pink-200 transition-all">
                    <PlusCircle className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm md:text-base">Novo Presente</p>
                    <p className="text-xs text-gray-500">Adicionar item</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
              </button>

              <button
                onClick={handleExport}
                disabled={isExporting}
                className="w-full flex items-center justify-between p-3 md:p-4 rounded-lg md:rounded-xl hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 transition-all duration-200 group border border-transparent hover:border-rose-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
              >
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="p-2 md:p-2.5 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 text-amber-600 group-hover:from-amber-200 group-hover:to-orange-200 transition-all">
                    {isExporting ? (
                      <div className="animate-spin w-4 h-4 md:w-5 md:h-5 border-2 border-amber-600 border-t-transparent rounded-full"></div>
                    ) : (
                      <Download className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-gray-800 text-sm md:text-base">
                      {isExporting ? 'Exportando...' : 'Exportar PDF'}
                    </p>
                    <p className="text-xs text-gray-500">Relatório completo</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
              </button>
            </div>
          </>
        )}

        {/* Painel Expandido - Substitui o conteúdo da sidebar */}
        {activePanel && (
          <>
            {/* Panel Header com botão de voltar */}
            <div className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 border-b border-rose-200">
              <div className="absolute inset-0 bg-gradient-to-r from-rose-400/10 to-pink-400/10"></div>
              <div className="relative flex items-center justify-between p-4 md:p-6">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={backToMenu}
                    className="p-2 rounded-lg hover:bg-white/50 transition-colors group"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                  </button>
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800">
                      {activePanel === 'dashboard' && 'Dashboard Completo'}
                      {activePanel === 'manage' && 'Gerenciar Presentes'}
                      {activePanel === 'form' && 'Formulário'}
                    </h3>
                    <p className="text-xs flex justify-start text-rose-600 font-medium">
                      {activePanel === 'dashboard' && 'Estatísticas detalhadas'}
                      {activePanel === 'manage' && 'Editar presentes'}
                      {activePanel === 'form' && 'Adicionar item'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={closePanel}
                  className="p-2 rounded-lg hover:bg-white/50 transition-colors group"
                >
                  <X className="w-5 h-5 text-gray-500 group-hover:text-gray-700" />
                </button>
              </div>
            </div>

            {/* Panel Content - Com scroll e padding responsivo */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 h-full pb-20">
              {activePanel === 'dashboard' && (
                <DashboardPanel stats={stats} gifts={gifts} />
              )}
              {activePanel === 'manage' && (
                <ManagePanel
                  gifts={gifts}
                  onUpdateGift={handleUpdate}
                  onDeleteGift={handleDelete}
                />
              )}
              {activePanel === 'form' && (
                <FormPanel
                  onSubmit={handleSubmit}
                  onCancel={backToMenu}
                  initialData={giftToEdit || {}}
                  isEdit={giftToEdit !== null}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* Export Success Message - Posição responsiva */}
      {showExportMessage && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-xl p-3 md:p-4 shadow-xl z-50 animate-bounce max-w-xs">
          <div className="flex items-center space-x-2 md:space-x-3">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="font-medium text-sm md:text-base">Lista exportada com sucesso!</p>
          </div>
        </div>
      )}
    </>
  );
};

// Dashboard Panel Component - Responsivo
const DashboardPanel: React.FC<{ stats: any; gifts: GiftType[] }> = ({ stats, gifts }) => {
  const recentGifts = gifts.slice(-5).reverse();
  const priceRanges = {
    low: gifts.filter(g => (g.price || 0) < 100).length,
    medium: gifts.filter(g => (g.price || 0) >= 100 && (g.price || 0) < 500).length,
    high: gifts.filter(g => (g.price || 0) >= 500).length,
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Price Distribution */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-200/50">
        <h4 className="text-sm font-bold text-gray-800 mb-3 md:mb-4 flex items-center">
          <BarChart3 className="h-4 w-4 text-rose-500 mr-2" />
          Distribuição por Preço
        </h4>
        <div className="space-y-2 md:space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 font-medium">Até R$ 100</span>
            <div className="flex items-center space-x-2">
              <div className="w-12 md:w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-400 to-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (priceRanges.low / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-gray-800 w-4">{priceRanges.low}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 font-medium">R$ 100-500</span>
            <div className="flex items-center space-x-2">
              <div className="w-12 md:w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-amber-400 to-yellow-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (priceRanges.medium / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-gray-800 w-4">{priceRanges.medium}</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-600 font-medium">Acima R$ 500</span>
            <div className="flex items-center space-x-2">
              <div className="w-12 md:w-16 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-rose-400 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.total > 0 ? (priceRanges.high / stats.total) * 100 : 0}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-gray-800 w-4">{priceRanges.high}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Status Overview */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-200/50">
        <h4 className="text-sm font-bold text-gray-800 mb-3 md:mb-4 flex items-center">
          <Activity className="h-4 w-4 text-rose-500 mr-2" />
          Status dos Presentes
        </h4>
        <div className="space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full"></div>
              <span className="text-xs text-gray-600 font-medium">Disponíveis</span>
            </div>
            <span className="text-sm font-bold text-emerald-600">{stats.available}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"></div>
              <span className="text-xs text-gray-600 font-medium">Reservados</span>
            </div>
            <span className="text-sm font-bold text-amber-600">{stats.reserved}</span>
          </div>
          <div className="pt-2 md:pt-3 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-gray-700">Taxa de Reserva</span>
              <span className="text-sm font-bold text-rose-600">{stats.reservationRate.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Gifts */}
      <div className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg md:rounded-xl p-4 md:p-5 border border-gray-200/50">
        <h4 className="text-sm font-bold text-gray-800 mb-3 md:mb-4 flex items-center">
          <Calendar className="h-4 w-4 text-rose-500 mr-2" />
          Presentes Recentes
        </h4>
        <div className="space-y-2 md:space-y-3">
          {recentGifts.length > 0 ? (
            recentGifts.slice(0, 3).map((gift) => (
              <div key={gift.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">{gift.name}</p>
                  <p className="text-xs text-gray-500">R$ {gift.price?.toFixed(2).replace('.', ',')}</p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${gift.status === 'available'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                  : 'bg-amber-100 text-amber-700 border border-amber-200'
                  }`}>
                  {gift.status === 'available' ? 'Disponível' : 'Reservado'}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">Nenhum presente cadastrado</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Manage Panel Component - Responsivo
const ManagePanel: React.FC<{
  gifts: GiftType[];
  onUpdateGift: (id: string, gift: Partial<GiftType>) => void;
  onDeleteGift: (id: string) => void;
}> = ({ gifts, onUpdateGift, onDeleteGift }) => {
  return (
    <div className="space-y-3 md:space-y-4">
      {gifts.length > 0 ? (
        gifts.map((gift) => (
          <div key={gift.id} className="bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200/50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-800 text-sm truncate">{gift.name}</h4>
                {gift.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{gift.description}</p>
                )}
              </div>
            </div>

            <div className="space-y-1.5 md:space-y-2 text-xs mb-3 md:mb-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Preço:</span>
                <span className="font-bold text-gray-800">
                  R$ {gift.price?.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-500 font-medium">Status:</span>
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${gift.status === 'available'
                    ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}
                >
                  {gift.status === 'available' ? 'Disponível' : 'Reservado'}
                </span>
              </div>

              {gift.reservedBy && (
                <div className="pt-1.5 md:pt-2 border-t border-gray-200">
                  <span className="text-gray-500 font-medium">Reservado por:</span>
                  <div className="font-semibold text-gray-800 text-xs mt-1 break-words">{gift.reservedBy}</div>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => { onUpdateGift(gift.id, gift) }}
                className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-3 py-2 md:py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 text-xs font-medium active:scale-95"
              >
                <Edit size={12} />
                <span>Editar</span>
              </button>
              <button
                onClick={() => onDeleteGift(gift.id)}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-3 py-2 md:py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center space-x-1 text-xs font-medium active:scale-95"
              >
                <Trash2 size={12} />  
                <span>Excluir</span>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-8">
          <Package className="h-10 w-10 md:h-12 md:w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 text-sm font-medium">Nenhum presente cadastrado</p>
          <p className="text-gray-400 text-xs">Adicione o primeiro presente para começar</p>
        </div>
      )}
    </div>
  );
};

// Form Panel Component - Responsivo
const FormPanel: React.FC<{
  onSubmit: (gift: any) => void;
  onCancel: () => void;
  initialData: any;
  isEdit: boolean;
}> = ({ onSubmit, onCancel, initialData, isEdit }) => {
  return (
    <div className="h-full">
      <GiftForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        initialData={initialData}
        isEdit={isEdit}
      />
    </div>
  );
};

export default AdminSidebar;