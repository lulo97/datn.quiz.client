const imgdata = [
    'https://cdn2.thecatapi.com/images/3kv.jpg',
    'https://cdn2.thecatapi.com/images/3lj.jpg',
    'https://cdn2.thecatapi.com/images/6oq.gif',
    'https://cdn2.thecatapi.com/images/a2g.png',
    'https://cdn2.thecatapi.com/images/a5c.jpg',
    'https://cdn2.thecatapi.com/images/a8r.jpg',
    'https://cdn2.thecatapi.com/images/aks.jpg',
    'https://cdn2.thecatapi.com/images/bnp.gif',
    'https://cdn2.thecatapi.com/images/dN6eoeLjY.jpg',
    'https://cdn2.thecatapi.com/images/THXQ9Nqie.jpg'
  ]

export default function QuizCard() {
    return (
        <div className="w-1/6 h-24 flex flex-col items-center border rounded-sm mt-0">
            <img
                className="object-contain h-3/4"
                src={imgdata[Math.floor(Math.random() * imgdata.length)]}
            ></img>
            <div className="h-1/4">Đề toán 12</div>
        </div>
    );
}