import React from 'react';

const Card = ({ imageUrl, title, buttonText }: { imageUrl: string, title: string, buttonText: string }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-amber-100 border border-amber-600 p-4 m-4">
            <img className="w-full" src={imageUrl} alt="Card" />
            <div className="px-6 py-4">
                <div className="font-serif font-bold text-xl mb-2 text-brown-800">{title}</div>
                <button className="bg-amber-600 hover:bg-brown-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {buttonText}
                </button>
            </div>
        </div>
    );
}

export default Card;
