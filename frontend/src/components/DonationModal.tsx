import React, { useState } from 'react';
import { X, Heart, ShieldCheck, CheckCircle2, CreditCard, Smartphone } from 'lucide-react';
import { CampaignItem } from '../types';

interface DonationModalProps {
  campaign: CampaignItem | null;
  onClose: () => void;
  onDonationSuccess: (campaignId: string, amount: number) => void;
}

export const DonationModal: React.FC<DonationModalProps> = ({
  campaign,
  onClose,
  onDonationSuccess,
}) => {
  const [amount, setAmount] = useState<number>(1000);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [donorName, setDonorName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  if (!campaign) return null;

  const presets = [500, 1000, 2500, 5000];

  const handleSelectPreset = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    const parsed = parseInt(e.target.value, 10);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDonationSuccess(campaign.id, amount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-purple-100 relative">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-100">
          <div>
            <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-extrabold uppercase tracking-wider">
              {campaign.category} Support
            </span>
            <h3 className="text-lg font-extrabold text-slate-900 mt-1 line-clamp-1">
              {campaign.title}
            </h3>
            <p className="text-xs text-slate-500">Target Goal: ₹{campaign.goal.toLocaleString('en-IN')}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          
          {/* Donation Presets */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Select Contribution Amount</label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {presets.map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleSelectPreset(val)}
                  className={`py-2.5 rounded-2xl text-xs font-bold border transition-all ${
                    amount === val && !customAmount
                      ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  ₹{val.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
            <input
              type="number"
              placeholder="Or enter custom amount in ₹"
              value={customAmount}
              onChange={handleCustomChange}
              className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:bg-white"
            />
          </div>

          {/* Payment Method Tabs */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">Payment Option</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'upi', label: 'UPI / GPay', icon: <Smartphone className="w-4 h-4" /> },
                { id: 'card', label: 'Card', icon: <CreditCard className="w-4 h-4" /> },
                { id: 'netbanking', label: 'NetBanking', icon: <ShieldCheck className="w-4 h-4" /> },
              ].map((method) => (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                    paymentMethod === method.id
                      ? 'bg-purple-50 text-purple-800 border-purple-300 shadow-sm'
                      : 'bg-slate-50 text-slate-600 border-slate-200'
                  }`}
                >
                  {method.icon}
                  <span>{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Donor Info Input */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Donor Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                disabled={isAnonymous}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="rounded text-rose-600 focus:ring-rose-500"
              />
              <span>Donate anonymously on public supporter list</span>
            </label>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-700 hover:to-purple-700 text-white font-extrabold rounded-2xl text-sm transition-all shadow-md shadow-rose-200 flex items-center justify-center gap-2"
            >
              <Heart className="w-4 h-4 fill-white/20" />
              <span>Complete Contribution of ₹{amount.toLocaleString('en-IN')}</span>
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              100% Transparent direct transfers to verified therapy partners.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
};
