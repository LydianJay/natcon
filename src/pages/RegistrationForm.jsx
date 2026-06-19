import { useEffect, useState } from "react";
import icon from "../assets/img/icons/piep-logo.webp";
import "../App.css";
import api from "../services/api";
import { useLoaderData } from "react-router";


export default function RegistrationForm() {
    
    const records = useLoaderData();

    useEffect(()=>{
        console.table(records);


    }, [records])

    const REGISTRATION_TYPES = {
        ENP: "enp",
        STUDENT: "student",
        NON_ENP: "non-enp",
    };

    const REG_UI = [
        {
            id: 'enp',
            title: 'ENP',
            text: 'Regular Registration Fee',
            icon: 'fa-solid fa-user-tie',
        },
        {
            id: 'non-enp',
            title: 'Non-ENP',
            text: 'Regular Registration Fee',
            icon: 'fa-solid fa-user',
        },
        {
            id: 'student',
            title: 'Student',
            text: 'Discounted Fee',
            icon: 'fa-solid fa-graduation-cap',
        }
    ];

    const STUDENT_DISCOUNT                      = 0.1;
    const [loading, setLoading]                 = useState(false);
    const [error, setError]                     = useState('');
    const [msg, setMsg]                         = useState(null);
    const [regType, setRegType]                 = useState(REGISTRATION_TYPES.ENP);
    // const [discountAmount, setDiscountAmount]

    
    const BASE_FEE          = records?.base_fee ?? 0; // This data should be fetched from backend instead of client side since they might just change the date
    const discountAmount    = (regType == REGISTRATION_TYPES.STUDENT) ? BASE_FEE * STUDENT_DISCOUNT : 0;
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
        reg_date: "",
        student_img: null,
        payment_ref: "",
        payment_img: null,
    });

    const chapter = [
        "Albay",
        "Bataan",
        "Batangas",
        "Bohol",
        "Bukidnon",
        "Cagayan",
        "Camarines",
        "Caraga",
        "Catanduanes",
        "Cavite",
        "Cebu",
        "Cotabato City-Maguindanao",
        "Davao",
        "Davao del Sur-Occidental",
        "Eastern Visayas",
        "Ilocos Sur",
        "Kingdom of Saudi Arabia",
        "La Union",
        "Laguna",
        "Masbate",
        "Misamis Oriental",
        "Misamis Occidental",
        "National Capital Region",
        "National Capital Region-North",
        "National Capital Region-South",
        "National Capital Region-West",
        "Negros Occidental",
        "Negros Oriental",
        "Northern Luzon",
        "Northern Mindanao",
        "Nueva Ecija- Aurora",
        "Nueva Vizcaya-Quirino",
        "Occidental Mindoro",
        "Olongapo-Zambales",
        "Oriental Mindoro",
        "Palawan",
        "Pampanga",
        "Qatar",
        "Quezon - Marinduque",
        "SoCCSKSarGen",
        "Sorsogon",
        "Tarlac",
        "Western Visayas",
        "ZamPenBaSulTa"
        ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };


    // this should be fetch from server
    const banks                                 = records?.banks ?? [];
    const [selectedBank, setSelectedBank]       = useState(records?.banks[0].name ?? []);
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

            payload.append("reg_type", regType);
            

            const res = await api.post(
                "/api/guest",
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(res);
            // window.location.href = res.data.url;
            setMsg('Registration Success!');

        } catch (err) {
            // console.error(err);
            console.log(err.response);
            

            if (err.response?.data?.msg) {
                setError(err.response.data.msg);
            } else {
                setError("Registration failed.");
            }
        } finally {
            setLoading(false);
        }
    };
        
    

    return (
        records != null ? (
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
                                <Input label="First Name *" name="fname" value={formData.fname} onChange={handleChange} required={true}/>
                                <Input label="Last Name *" name="lname" value={formData.lname} onChange={handleChange} required={true} />
                                <Input label="Middle Name" name="mname" value={formData.mname} onChange={handleChange} />
                                <Input label="Extension (Jr., Sr., III)" value={formData.ext} onChange={handleChange} name="ext" />
                                <Input label="Contact Number *" name="contactno" value={formData.contactno} onChange={handleChange} type="tel" required={true} />
                                <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} required={true} />
                                
                            </div>
                        </section>

                        <section>
                            <h2 className="section-title mb-2">
                                Registration Type
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                {
                                    REG_UI.map((c) => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => {
                                                setRegType(c.id);
                                                
                                            }}
                                            className={`group relative border rounded-xl p-5 text-left transition-all duration-200
                                                hover:shadow-md hover:border-gray-400
                                                ${regType == c.id
                                                    ? "border-green-600 bg-green-50 shadow-sm"
                                                    : "border-gray-200 bg-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`text-2xl transition ${
                                                    regType == c.id  ? "text-green-700" : "text-gray-400"
                                                }`}>
                                                </div>

                                                <div>
                                                    <h3 className="font-semibold text-gray-800">
                                                        <span className="mx-1">
                                                            <i className={`${c.icon} text-gray-800`}></i>
                                                        </span>
                                                        {c.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-500">
                                                        {c.text}
                                                    </p>

                                                    {c.id == REGISTRATION_TYPES.STUDENT && (
                                                        <span className="inline-block mt-1 text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                                                            {STUDENT_DISCOUNT * 100}% OFF
                                                        </span>
                                                    )}
                                                    
                                                </div>
                                            </div>

                                            {regType == c.id && (
                                                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-green-600 rounded-full" />
                                            )}
                                        </button>
                                    ))
                                }

                            </div>
                        </section>

                        


                        {regType == REGISTRATION_TYPES.STUDENT ? (
                                <section className="border border-green-200 bg-green-50 rounded-xl p-5">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xl">
                                            <i className="fa-solid fa-graduation-cap text-green-900"></i>
                                        </span>
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
                                            name="student_image"
                                            accept="image/*,.pdf"
                                            required={regType == REGISTRATION_TYPES.STUDENT}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    student_image: e.target.files[0]
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
                                    <h2 className="section-title mb-2">Professional Information</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <Select
                                            label="Chapter"
                                            name="chapter"
                                            options={chapter}
                                            onChange={handleChange}
                                            value={formData.chapter}
                                        />
                                        <Input label="PRC Number" name="prc_no"  value={formData.prc_no} onChange={handleChange} />
                                        <Input label="PRC Registration Date" name="reg_date"  type="date" value={formData.reg_date} onChange={handleChange} />
                                        <Input label="PRC Expiry Date" name="expiry_date"  type="date" value={formData.expiry_date} onChange={handleChange} />
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

                                {regType == REGISTRATION_TYPES.STUDENT && (
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
                                    {selectedBankData.details.map((d, index) => {
                                        return <p key={index}>{d}</p>
                                    })}
                                </div>
                            )}

                            {/* PAYMENT FIELDS */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Payment Reference Number" name="payment_ref" value={formData.payment_ref} onChange={handleChange} required={true} />

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
                                        required={true}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2
                                        file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-green-100
                                        file:text-green-700 hover:file:bg-green-200"
                                    />
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* SUBMIT */}
                    <div className="flex justify-center my-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/4 bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white py-3 rounded-xl font-medium"
                        >
                            {loading ? "Submitting..." : "Register Now"}
                        </button>
                    </div>
                    
                </form>

                
                {error && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fa-solid fa-circle-exclamation text-red-500 text-2xl"></i>
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Registration Error
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                {error}
                            </p>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setError(null)}
                                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {msg && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <i className="fa-regular fa-circle-check text-green-500 text-2xl"></i>
                                <h2 className="text-lg font-semibold text-green-700">
                                    Registration Status
                                </h2>
                            </div>

                            <p className="text-gray-600 mb-6">
                                {msg}
                            </p>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => {
                                        setError(null);
                                        setMsg(null);
                                        window.location.href = import.meta.env.VITE_BASE_URL;
                                    }}
                                    className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>

            
        ) : (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Fetching data from server..</p>
                </div>
            </div>
        )
    );
}

/* INPUT */
function Input({
    label,
    name,
    type = "text",
    text = "",
    value,
    onChange,
    required = false,
}) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                
                {label}
                <span className="mx-1 text-gray-400 text-sm">
                    {text}
                </span>
            </label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
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
                <option value="N/A">N/A</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

