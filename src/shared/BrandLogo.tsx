import Link from "next/link";


const BrandLogo = () => {

    return (
        <>
            <div>
                <Link href="/" className="flex items-center md:text-xl lg:text-2xl font-bold">
                    <span className="text-white lg:bg-gradient-to-r from-[#974fef] to-[#7640b8] lg:text-transparent inline-block "
                        style={{ WebkitBackgroundClip: "text" }}>
                        Tailor
                    </span>
                    Desk
                </Link>
            </div>
        </>
    );
};

export default BrandLogo;