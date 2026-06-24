import { useEffect, useState } from "react";
import icon from "../assets/img/icons/piep-logo.webp";
import "../App.css";
import api from "../services/api";
import { useLoaderData } from "react-router";

export default function ReservationForm(){

    const [loading, setLoading]                 = useState(false);
    const [error, setError]                     = useState('');
    const [msg, setMsg]                         = useState(null);
    const [chapter, setChapter]                 = useState('N/A');
    const records                               = useLoaderData();

    // useEffect(()=>{
    //     console.table(records);


    // }, [records]);

    const [formData, setFormData] = useState({
        email: "",
        cname: "",
        rname: "",
        contactno: "",
        chapter: "",
        package: "",
        payment_ref: "",
        payment_img: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const banks                                 = records?.banks ?? [];
    const [selectedBank, setSelectedBank]       = useState(records?.banks[0].name ?? []);
    const selectedBankData = banks.find(b => b.name === selectedBank);


    const REG_UI = [
        {
            id: 'B1',
            title: 'Platinum',
            text: 'P100,000',
            icon: 'fa-solid fa-star',
        },
        {
            id: 'B2',
            title: 'Diamond',
            text: 'P75,000',
            icon: 'fa-solid fa-gem',
        },
        {
            id: 'B3',
            title: 'Gold',
            text: 'P50,000',
            icon: 'fa-solid fa-coins',
        }
    ];

    const TIERS = {
        PLATINUM: "B1",
        DIAMOND: "B2",
        GOLD: "B3",
    };

    const [tierType, setTierType]                 = useState(TIERS.PLATINUM);

    const chapters = [
        "N/A",
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

            payload.append("package", tierType);
            

            const res = await api.post(
                "/api/exhibitors",
                payload,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log(res);
            // window.location.href = res.data.url;
            setMsg('Reservation Success!');

        } catch (err) {
            // console.error(err);
            console.log(err.response);
            

            if (err.response?.data?.msg) {
                setError(err.response.data.msg);
            } else {
                setError("Reservation failed.");
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        records != null ? (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
                <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">

                    <div className="bg-green-700 text-white px-6 py-5 flex items-center gap-4">
                        <img
                            src={icon}
                            alt="Logo"
                            className="w-12 h-12 rounded-full bg-white p-1"
                        />
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold">
                                Sponsors/Exhibitors Form
                            </h1>
                            <p className="text-sm opacity-90">
                                Please fill the details in this form
                            </p>
                        </div>
                    </div>


                    <div className="p-6 space-y-10">
                        <section>
                            <h2 className="section-title">Company Information</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Sponsor Company Name *" name="cname" value={formData.cname} onChange={handleChange} required={true}/>
                                <Input label="Representative's Name *" name="rname" value={formData.rname} onChange={handleChange} required={true} />
                                <Input label="Landline/Contact No *" name="contactno" value={formData.contactno} onChange={handleChange} required={true} />
                                <Input label="Company Email *" name="email" type="email" value={formData.email} onChange={handleChange} required={true} />
                            </div>
                        </section>


                        <section>
                            <h2 className="section-title">Soliciting Chapter</h2>

                            <div className="grid grid-cols-1 gap-4">
                                <Select
                                    label="Chapter"
                                    name={chapter == 'N/A' ? 'nulldata' : 'chapter'}
                                    options={chapters}
                                    onChange={(e) => {
                                        handleChange(e);
                                        // setChapter(e)
                                        // console.log(e.target.value);
                                        setChapter(e.target.value);
                                    }}
                                    value={formData.chapter}
                                />
                                
                            </div>
                            {
                                chapter == 'N/A' && (
                                    <div className="grid grid-cols-1 gap-4 my-2">
                                        <Input label="Others Specify" name="chapter" value={formData.chapter} onChange={handleChange} required={true}  />
                                    </div>
                                )
                            }
                            
                        </section>


                        <section>
                            <h2 className="section-title mb-2">
                                Package Selection
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                {
                                    REG_UI.map((c) => (
                                        <button
                                            key={c.id}
                                            type="button"
                                            onClick={() => {
                                                setTierType(c.id);
                                                
                                            }}
                                            className={`group relative border rounded-xl p-5 text-left transition-all duration-200
                                                hover:shadow-md hover:border-gray-400
                                                ${tierType == c.id
                                                    ? "border-green-600 bg-green-50 shadow-sm"
                                                    : "border-gray-200 bg-white"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`text-2xl transition ${
                                                    tierType == c.id  ? "text-green-700" : "text-gray-400"
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

                                                    
                                                    
                                                </div>
                                            </div>

                                            {tierType == c.id && (
                                                <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-green-600 rounded-full" />
                                            )}
                                        </button>
                                    ))
                                }

                            </div>
                        </section>

                        

                        

                        <section>
                            <h2 className="section-title">Payment Information</h2>


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

                    <div className="flex justify-center my-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-1/4 bg-green-700 hover:bg-green-800 disabled:opacity-50 text-white py-3 rounded-xl font-bold"
                        >
                            {loading ? "Submitting..." : "Submit"}
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
                {/* <option value="N/A">N/A</option> */}
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
        </div>
    );
}

