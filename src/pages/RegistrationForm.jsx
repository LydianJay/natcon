import { useState } from "react";
import icon from "../assets/img/icons/piep-logo.webp";
import "../App.css";
import api from "../services/api";


export default function RegistrationForm() {
    const [selectedBank, setSelectedBank]   = useState("");
    const [loading, setLoading]             = useState(false);
    const [error, setError]                 = useState('');
    const [isStudent, setIsStudent]         = useState(false);


    const BASE_FEE          = 8000;
    const STUDENT_DISCOUNT  = 0.2;
    const discountAmount    = isStudent ? BASE_FEE * STUDENT_DISCOUNT : 0;
    const totalAmount       = BASE_FEE - discountAmount;

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        mname: "",
        ext: "",
        contactno: "",
        email: "",

        chapter: "",
        prc_no: "",
        expiry_date: "",

        payment_ref: "",
        payment_img: null,
        student_id: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // this should be fetch from server
    const banks = [
        {
            name: "Land Bank",
            img: "https://www.landbank.com/assets/landbank-logo.png",
            details: "Account Name:  Philippine Institute of Environmental Planners, Inc.\nAccount No: 3432-1014-35",
        },
        
    ];

    const selectedBankData = banks.find(b => b.name === selectedBank);



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            const payload = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (value !== null) {
                    payload.append(key, value);
                }
            });

            payload.append("is_student", isStudent ? 1 : 0);
            payload.append("discount_amount", discountAmount);
            payload.append("total_amount", totalAmount);
            payload.append("selected_bank", selectedBank);

            const res = await api.post(
                "/register",
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            window.location.href = res.data.url;

        } catch (err) {
            console.error(err);

            if (err.response?.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Registration failed.");
            }
        } finally {
            setLoading(false);
        }
    };
        
    

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

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
                            <Input label="First Name *" name="fname" value={formData.fname} onChange={handleChange}/>
                            <Input label="Last Name *" name="lname" value={formData.lname} onChange={handleChange} />
                            <Input label="Middle Name" name="mname" value={formData.mname} onChange={handleChange} />
                            <Input label="Extension (Jr., Sr., III)" value={formData.ext} onChange={handleChange} name="ext" />
                            <Input label="Contact Number" name="contactno" value={formData.contactno} onChange={handleChange} type="tel" />
                            <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
                            
                        </div>
                    </section>

                    <section>
                        <h2 className="section-title">
                            Registration Type
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {/* Professional */}
                            <button
                                type="button"
                                onClick={() => setIsStudent(false)}
                                className={`group relative border rounded-xl p-5 text-left transition-all duration-200
                                    hover:shadow-md hover:border-gray-400
                                    ${!isStudent
                                        ? "border-green-600 bg-green-50 shadow-sm"
                                        : "border-gray-200 bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`text-2xl transition ${
                                        !isStudent ? "text-green-700" : "text-gray-400"
                                    }`}>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Professional
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Regular registration fee
                                        </p>
                                    </div>
                                </div>

                                {/* active indicator */}
                                {!isStudent && (
                                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-green-600 rounded-full" />
                                )}
                            </button>

                            {/* Student */}
                            <button
                                type="button"
                                onClick={() => setIsStudent(true)}
                                className={`group relative border rounded-xl p-5 text-left transition-all duration-200
                                    hover:shadow-md hover:border-green-400
                                    ${isStudent
                                        ? "border-green-600 bg-green-50 shadow-sm"
                                        : "border-gray-200 bg-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`text-2xl transition ${
                                        isStudent ? "text-green-700" : "text-gray-400"
                                    }`}>
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-gray-800">
                                            Student
                                        </h3>

                                        <p className="text-sm text-gray-500">
                                            Discounted registration
                                        </p>

                                        <span className="inline-block mt-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                            {STUDENT_DISCOUNT * 100}% OFF
                                        </span>
                                    </div>
                                </div>

                                {/* active indicator */}
                                {isStudent && (
                                    <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-green-600 rounded-full" />
                                )}
                            </button>

                        </div>
                    </section>

                    {/* PROFESSIONAL */}
                    


                    {isStudent ? (
                            <section className="border border-green-200 bg-green-50 rounded-xl p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="text-xl">🎓</span>
                                    <div>
                                        <h3 className="font-semibold text-green-800">
                                            Student Verification
                                        </h3>
                                        <p className="text-sm text-green-700">
                                            Upload a valid school ID to qualify for the student discount.
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">
                                        Student ID *
                                    </label>

                                    <input
                                        type="file"
                                        name="student_id"
                                        accept="image/*,.pdf"
                                        required={isStudent}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                student_id: e.target.files[0]
                                            })
                                        }
                                        className="w-full border rounded-lg px-3 py-2
                                        file:mr-3 file:px-4 file:py-2
                                        file:bg-green-600 file:text-white
                                        file:border-0 file:rounded-md"
                                    />
                                </div>
                            </section>
                        ) :

                        (
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
                        )

                    }



                    {/* REGISTRATION FEE */}
                    <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                        <h3 className="font-semibold mb-4">
                            Registration Summary
                        </h3>

                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Convention Fee</span>
                                <span>₱{BASE_FEE.toLocaleString()}</span>
                            </div>

                            {isStudent && (
                                <div className="flex justify-between text-green-700">
                                    <span>Student Discount</span>
                                    <span>-₱{discountAmount.toLocaleString()}</span>
                                </div>
                            )}

                            <hr />

                            <div className="flex justify-between text-lg font-bold">
                                <span>Total Due</span>
                                <span className="text-green-700">
                                    ₱{totalAmount.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>

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
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            payment_img: e.target.files[0]
                                        })
                                    }
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2
                                    file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-green-100
                                    file:text-green-700 hover:file:bg-green-200"
                                />
                            </div>
                        </div>
                    </section>
                </div>

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white py-3 rounded-xl font-medium"
                >
                    {loading ? "Submitting..." : "Register Now"}
                </button>
            </form>
        </div>
    );
}

/* INPUT */
function Input({
    label,
    name,
    type = "text",
    value,
    onChange
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2
                focus:ring-2 focus:ring-green-600 focus:border-green-600 outline-none"
            />
        </div>
    );
}

/* SELECT */
function Select({ label,
    name,
    value,
    onChange,
    options = [] }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <select
                name={name}
                value={value}
                onChange={onChange}
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