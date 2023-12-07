export default async function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <div className="w-1/2">
                <div className="flex items-center justify-between ">
                    <h1 className="text-3xl"><span className="text-pink-500 font-bold">T3</span> Todo</h1>
                    <button type="button" className="border border-pink-500 text-md py-2 px-5 rounded-full">Create</button>
                </div>
                <div>

                </div>
            </div>
        </main>
    );
}

