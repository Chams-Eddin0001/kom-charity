import { Heart, CreditCard, Wallet, Building, Gift, CheckCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useState } from "react";
import { useToast } from "../hooks/use-toast";

const DonatePage = () => {
    const { toast } = useToast();
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState("");

    const donationAmounts = [25, 50, 100, 250, 500, 1000];

    const impactItems = [
        { amount: 25, impact: "Provides educational materials for 1 student" },
        { amount: 50, impact: "Supports a student's monthly research supplies" },
        { amount: 100, impact: "Funds a workshop session for 10 participants" },
        { amount: 250, impact: "Sponsors a student's semester project" },
        { amount: 500, impact: "Supports a research publication" },
        { amount: 1000, impact: "Funds a full scholarship for engineering training" }
    ];

    const handleDonate = () => {
        const amount = selectedAmount || Number(customAmount);
        if (!amount || amount <= 0) {
            toast({
                title: "Please select an amount",
                description: "Choose a donation amount or enter a custom value.",
                variant: "destructive"
            });
            return;
        }
        toast({
            title: "Thank you for your generosity!",
            description: `Your donation of $${amount} will make a real difference.`,
        });
    };

    return (
        <div className="min-h-screen">
            <Header />
            <main className="pt-20">
                <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="section-header">
                            <div className="inline-block mb-4">
                                <span className="bg-gradient-to-r from-purple-100 to-orange-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    Support Our Mission
                                </span>
                            </div>
                            <h2 className="section-title">Make a Donation</h2>
                            <p className="section-description">
                                Your contribution supports engineering education, research initiatives, and community development programs led by Professor Khmaies Ouahada.
                            </p>
                        </div>

                        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                            {/* Donation Form */}
                            <Card className="p-8 md:p-10 card-elevated border border-gray-100">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Amount</h3>
                                <p className="text-gray-600 mb-8">Select a donation amount or enter a custom value.</p>

                                {/* Amount Grid */}
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {donationAmounts.map((amount) => (
                                        <button
                                            key={amount}
                                            onClick={() => {
                                                setSelectedAmount(amount);
                                                setCustomAmount("");
                                            }}
                                            className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 ${selectedAmount === amount
                                                ? 'bg-gray-900 text-white shadow-lg scale-105'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            ${amount}
                                        </button>
                                    ))}
                                </div>

                                {/* Custom Amount */}
                                <div className="mb-8">
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Custom Amount</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                                        <Input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={customAmount}
                                            onChange={(e) => {
                                                setCustomAmount(e.target.value);
                                                setSelectedAmount(null);
                                            }}
                                            className="pl-8 h-14 text-lg input-field"
                                        />
                                    </div>
                                </div>

                                {/* Payment Methods */}
                                <div className="mb-8">
                                    <h4 className="font-semibold text-gray-900 mb-4">Payment Method</h4>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <CreditCard className="w-6 h-6 text-gray-700" />
                                            <span className="text-sm font-medium text-gray-700">Card</span>
                                        </button>
                                        <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <Wallet className="w-6 h-6 text-gray-700" />
                                            <span className="text-sm font-medium text-gray-700">PayPal</span>
                                        </button>
                                        <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <Building className="w-6 h-6 text-gray-700" />
                                            <span className="text-sm font-medium text-gray-700">Bank</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Donate Button */}
                                <Button
                                    onClick={handleDonate}
                                    size="lg"
                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-6 rounded-xl"
                                >
                                    <Heart className="mr-2 w-5 h-5" fill="currentColor" />
                                    Donate {selectedAmount ? `$${selectedAmount}` : customAmount ? `$${customAmount}` : 'Now'}
                                </Button>

                                <p className="text-center text-sm text-gray-500 mt-4">
                                    Your donation is secure and encrypted.
                                </p>
                            </Card>

                            {/* Impact Section */}
                            <div className="space-y-6">
                                <Card className="p-8 card-elevated border border-gray-100">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-orange-500 flex items-center justify-center">
                                            <Gift className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900">Your Impact</h3>
                                            <p className="text-gray-600 text-sm">See how your donation helps</p>
                                        </div>
                                    </div>

                                    <ul className="space-y-4">
                                        {impactItems.map((item) => (
                                            <li key={item.amount} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-600 text-sm">
                                                    <strong className="text-gray-900">${item.amount}</strong> — {item.impact}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </Card>

                                <Card className="p-8 card-elevated border border-gray-100 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                                    <h3 className="text-xl font-bold mb-4">Why Donate?</h3>
                                    <p className="text-gray-600 leading-relaxed mb-4">
                                        Your support directly funds engineering education, research publications,
                                        and student development programs in South Africa.
                                    </p>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        <li>• 100% goes to educational initiatives</li>
                                        <li>• Supporting 19+ students currently</li>
                                        <li>• 184+ research publications funded</li>    
                                        <li>• Advancing smart technologies</li>
                                    </ul>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default DonatePage;
