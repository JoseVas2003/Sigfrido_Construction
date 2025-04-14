"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import Navbar from '../navbar/navBar';
import Footer from "../../app/footer/footer";
import "../../app/Assets/css/Faq.css";

// Define FAQ type
type FaqItem =
  | { type: 'title'; text: string }
  | { type: 'qa'; question: string; answer: string };

export default function FaqPage() {
    const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [language, setLanguage] = useState<'EN' | 'ES'>('EN');
    const [loading, setLoading] = useState(true);

    const { data: session } = useSession();
    const isAdmin = session?.user?.email === "NewAdmin@account.com";

    const toggleAnswer = (index: number) => {
        setActiveIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const moveItemUp = (index: number) => {
        if (index <= 0) return;
        const newItems = [...faqItems];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        setFaqItems(newItems);
    };

    const moveItemDown = (index: number) => {
        if (index >= faqItems.length - 1) return;
        const newItems = [...faqItems];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        setFaqItems(newItems);
    };

    useEffect(() => {
        const fetchFaqItems = async () => {
            try {
                const res = await axios.get('${process.env.NEXT_PUBLIC_API_BASE_URL}/faq');
                setFaqItems(res.data);
            } catch (err) {
                console.error("Failed to fetch FAQ items:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqItems();
    }, []);

    if (loading) return <p style={{ textAlign: 'center' }}>Loading FAQ...</p>;

    return (
        <div>
            <Navbar />

            <div className='faq-container'>
                <h1 className='faq-container h1'>Frequently Asked Questions</h1>

                <div className="language-button-right">
                    <button
                        className="language-toggle-button"
                        onClick={() => setLanguage(prev => (prev === 'EN' ? 'ES' : 'EN'))}
                    >
                        {language === 'EN' ? '🇲🇽' : '🇺🇸'}
                    </button>
                </div>

                {faqItems.map((item, index) => {
                    if (item.type === 'title') {
                        return (
                            <div key={index} className="faq-section-title" style={{ position: 'relative' }}>
                                {isEditing ? (
                                    <>
                                        <input
                                            className="faq-title-input"
                                            type="text"
                                            value={item.text}
                                            onChange={(e) => {
                                                const newItems = [...faqItems];
                                                if (newItems[index].type === 'title') {
                                                    newItems[index] = {
                                                        ...newItems[index],
                                                        text: e.target.value
                                                    };
                                                    setFaqItems(newItems);
                                                }
                                            }}
                                        />
                                        <button
                                            className='delete-icon'
                                            title="Delete Title"
                                            onClick={() => {
                                                const newItems = [...faqItems];
                                                newItems.splice(index, 1);
                                                setFaqItems(newItems);
                                            }}
                                        >❌</button>
                                        <div className="move-buttons">
                                            <button onClick={() => moveItemUp(index)} disabled={index === 0}>⬆</button>
                                            <button onClick={() => moveItemDown(index)} disabled={index === faqItems.length - 1}>⬇</button>
                                        </div>
                                    </>
                                ) : (
                                    item.text
                                )}
                            </div>
                        );
                    }

                    return (
                        <div className='faq-item' key={index}>
                            <div className='faq-question-container'>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={item.question}
                                        onChange={(e) => {
                                            const newItems = [...faqItems];
                                            if (newItems[index].type === 'qa') {
                                                newItems[index] = {
                                                    ...newItems[index],
                                                    question: e.target.value
                                                };
                                                setFaqItems(newItems);
                                            }
                                        }}
                                        className="faq-question-input"
                                    />
                                ) : (
                                    <button
                                        className={`faq-question ${activeIndex === index ? 'active' : ''}`}
                                        onClick={() => toggleAnswer(index)}
                                    >
                                        {item.question}
                                        <span className='arrow'>&#9660;</span>
                                    </button>
                                )}

                                {isEditing && (
                                    <>
                                        <button
                                            className='delete-icon'
                                            title="Delete Question"
                                            onClick={() => {
                                                const newItems = [...faqItems];
                                                newItems.splice(index, 1);
                                                setFaqItems(newItems);
                                            }}
                                        >❌</button>
                                        <div className="move-buttons">
                                            <button onClick={() => moveItemUp(index)} disabled={index === 0}>⬆</button>
                                            <button onClick={() => moveItemDown(index)} disabled={index === faqItems.length - 1}>⬇</button>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div
                                className='faq-answer'
                                style={{ maxHeight: isEditing || activeIndex === index ? '200px' : '0px' }}
                            >
                                {isEditing ? (
                                    <textarea
                                        value={item.answer}
                                        onChange={(e) => {
                                            const newItems = [...faqItems];
                                            if (newItems[index].type === 'qa') {
                                                newItems[index] = {
                                                    ...newItems[index],
                                                    answer: e.target.value
                                                };
                                                setFaqItems(newItems);
                                            }
                                        }}
                                        className="faq-answer-input"
                                    />
                                ) : (
                                    <p>{item.answer}</p>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Edit/Save Button Section */}
                <div style={{ marginTop: '30px', position: 'relative', height: '40px' }}>
                    {isEditing && (
                        <div style={{ position: 'absolute', left: 'calc(50% - 140px)' }}>
                            <button
                                id="addTitleButton"
                                className="title-button"
                                onClick={() => {
                                    setFaqItems(prev => [...prev, { type: 'title', text: 'New Section Title' }]);
                                }}
                            >
                                Add Title
                            </button>
                        </div>
                    )}

                    <div style={{ textAlign: 'center' }}>
                        {isAdmin &&  (
                            <button
                            id="editButton"
                            className={isEditing ? 'save-button' : 'edit-button'}
                            onClick={async () => {
                                if (isEditing) {
                                    try {
                                        await axios.post("${process.env.NEXT_PUBLIC_API_BASE_URL}/faq", faqItems);
                                        console.log("✅ FAQ saved successfully.");
                                    } catch (err) {
                                        console.error("Failed to save FAQ:", err);
                                        console.error("❌ Error saving FAQ.");
                                    }
                                }
                                setIsEditing(prev => !prev);
                            }}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                            </button>
                        )}
                    </div>

                    {isEditing && (
                        <button
                            id="addQuestionButton"
                            className="add-button"
                            style={{ position: 'absolute', left: 'calc(50% + 40px)', top: '0' }}
                            onClick={() => {
                                setFaqItems(prev => [
                                    ...prev,
                                    { type: 'qa', question: 'New Question', answer: 'New Answer' },
                                ]);
                            }}
                        >
                            Add Question
                        </button>
                    )}
                </div>
            </div>

            <hr className="section-separator" />
            <Footer />
        </div>
    );
}