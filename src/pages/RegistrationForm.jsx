import { useState } from "react";
import icon from "../assets/img/icons/piep-logo.webp";
import "../App.css";

export default function RegistrationForm() {
    const [selectedBank, setSelectedBank] = useState("");

    const BASE_FEE = 8000;
    const STUDENT_DISCOUNT = 0.2;

    const [isStudent, setIsStudent] = useState(false);

    const discountAmount = isStudent ? BASE_FEE * STUDENT_DISCOUNT : 0;
    const totalAmount = BASE_FEE - discountAmount;

    const banks = [
        {
            name: "Land Bank",
            img: "https://www.landbank.com/assets/landbank-logo.png",
            details: "Account Name:  Philippine Institute of Environmental Planners, Inc.\nAccount No: 3432-1014-35",
        },
        
        
    ];

    const selectedBankData = banks.find(b => b.name === selectedBank);

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <form className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* HEADER WITH LOGO */}
                <div className="bg-green-700 text-white px-6 py-5 flex items-center gap-4">
                    <img
                        src={icon}
                        alt="Logo"
                        className="w-12 h-12 rounded-full bg-white p-1"
                    />
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">
                            Convention Registration
                        </h1>
                        <p className="text-sm opacity-90">
                            Complete your details below
                        </p>
                    </div>
                </div>

                <div className="p-6 space-y-10">

                    {/* PERSONAL */}
                    <section>
                        <h2 className="section-title">Personal Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="First Name *" name="fname" />
                            <Input label="Last Name *" name="lname" />
                            <Input label="Middle Name" name="mname" />
                            <Input label="Extension (Jr., Sr., III)" name="ext" />
                            <Input label="Contact Number" name="contactno" type="tel" />
                            <Input label="Email" name="email" type="email" />
                            
                        </div>
                    </section>

                    {/* PROFESSIONAL */}
                    <section>
                        <h2 className="section-title">Professional Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Select
                                label="Chapter"
                                name="chapter"
                                options={["Region I", "Region II", "Region III"]}
                            />
                            <Input label="PRC Number" name="prc_no" />
                            <Input label="PRC Expiry Date" name="expiry_date" type="date" />
                        </div>
                    </section>

                    {/* REGISTRATION FEE */}
                    <section>
                        <h2 className="section-title">Registration Fee</h2>

                        <div className="bg-gray-50 border rounded-xl p-5 space-y-4">

                            {/* Base Fee */}
                            <div className="flex justify-between text-sm md:text-base">
                                <span className="text-gray-600">Base Fee</span>
                                <span className="font-medium">₱{BASE_FEE.toLocaleString()}</span>
                            </div>

                            {/* Student Checkbox */}
                            <label className="flex items-center gap-2 text-sm cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isStudent}
                                    onChange={() => setIsStudent(!isStudent)}
                                    className="w-4 h-4 accent-green-700"
                                />
                                I am a student ({STUDENT_DISCOUNT * 100}% discount)
                            </label>

                            {/* Discount */}
                            {isStudent && (
                                <div className="flex justify-between text-sm text-green-700">
                                    <span>Student Discount</span>
                                    <span>-₱{discountAmount.toLocaleString()}</span>
                                </div>
                            )}

                            {/* Divider */}
                            <div className="border-t pt-3 flex justify-between text-lg font-bold">
                                <span>Total Amount</span>
                                <span className="text-green-700">
                                    ₱{totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* PAYMENT */}
                    <section>
                        <h2 className="section-title">Payment Information</h2>

                        {/* BANK SELECTION */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                            {banks.map((bank) => (
                                <button
                                    type="button"
                                    key={bank.name}
                                    onClick={() => setSelectedBank(bank.name)}
                                    className={`border rounded-xl p-3 flex flex-col items-center gap-2 transition
                                        ${selectedBank === bank.name
                                            ? "border-green-700 bg-green-50"
                                            : "border-gray-200 hover:border-green-400"
                                        }`}
                                >
                                    <img src={bank.img} alt={bank.name} className="h-10 object-contain" />
                                    <span className="text-sm font-medium">{bank.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* BANK DETAILS DISPLAY */}
                        {selectedBankData && (
                            <div className="bg-gray-50 border rounded-xl p-4 mb-4 whitespace-pre-line text-sm">
                                {selectedBankData.details}
                            </div>
                        )}

                        {/* PAYMENT FIELDS */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Payment Reference Number" name="payment_ref" />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Upload Proof of Payment
                                </label>
                                <input
                                    type="file"
                                    name="payment_img"
                                    accept="image/*"
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2
                                    file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-green-100
                                    file:text-green-700 hover:file:bg-green-200"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* SUBMIT */}
                <div className="sticky bottom-0 bg-white border-t p-4">
                    <button
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-medium transition"
                    >
                        Register Now
                    </button>
                </div>
            </form>
        </div>
    );
}

/* INPUT */
function Input({ label, name, type = "text" }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                name={name}
                className="w-full border border-gray-300 rounded-lg px-3 py-2
                focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            />
        </div>
    );
}

/* SELECT */
function Select({ label, name, options = [] }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                name={name}
                className="w-full border border-gray-300 rounded-lg px-3 py-2
                focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            >
                <option value="">Select</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

/* SECTION TITLE STYLE (optional utility class idea) */