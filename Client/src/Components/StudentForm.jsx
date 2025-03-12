import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        university: '',
        major: '',
        story: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await axios.post('http://localhost:4000/api/students', formData);
            setSubmitStatus('success');
            setFormData({ name: '', university: '', major: '', story: '' });
        } catch (error) {
            console.error('حدث خطأ أثناء إرسال القصة:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#ECECEC] min-h-screen flex items-center justify-center p-4">
            <form 
                onSubmit={handleSubmit} 
                className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
                style={{
                    borderTop: '6px solid #940066',
                    boxShadow: '0 4px 6px rgba(148, 0, 102, 0.1)'
                }}
            >
                <h2 
                    className="text-3xl font-bold mb-6 text-center"
                    style={{ color: '#940066' }}
                >
                    أضف قصتك الناجحة
                </h2>

                {submitStatus === 'success' && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">تم إرسال القصة بنجاح!</span>
                    </div>
                )}

                {submitStatus === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                        <span className="block sm:inline">حدث خطأ أثناء إرسال القصة. يرجى المحاولة مرة أخرى.</span>
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">الاسم</label>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="الاسم" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                            style={{
                                borderColor: '#940066',
                                ':focus': { boxShadow: '0 0 0 2px rgba(148, 0, 102, 0.3)' }
                            }}
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">الجامعة</label>
                        <input 
                            type="text" 
                            name="university" 
                            placeholder="الجامعة" 
                            value={formData.university} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                            style={{
                                borderColor: '#940066',
                                ':focus': { boxShadow: '0 0 0 2px rgba(148, 0, 102, 0.3)' }
                            }}
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">التخصص</label>
                        <input 
                            type="text" 
                            name="major" 
                            placeholder="التخصص" 
                            value={formData.major} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
                            style={{
                                borderColor: '#940066',
                                ':focus': { boxShadow: '0 0 0 2px rgba(148, 0, 102, 0.3)' }
                            }}
                            required 
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 mb-2">القصة</label>
                        <textarea 
                            name="story" 
                            placeholder="قصتك" 
                            value={formData.story} 
                            onChange={handleChange} 
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none h-32"
                            style={{
                                borderColor: '#940066',
                                ':focus': { boxShadow: '0 0 0 2px rgba(148, 0, 102, 0.3)' }
                            }}
                            required 
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full py-3 rounded-lg text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98] mt-6 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    style={{ 
                        backgroundColor: '#940066',
                        boxShadow: '0 4px 6px rgba(148, 0, 102, 0.3)'
                    }}
                >
                    {isSubmitting ? 'جاري الإرسال...' : 'إرسال'}
                </button>
            </form>
        </div>
    );
};

export default StudentForm;