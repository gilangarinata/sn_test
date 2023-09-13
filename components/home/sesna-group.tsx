import Image from "next/image";

const experiences = [
    {
        icon : '/images/icon_experience_1.webp',
        label: 'Cities in Indonesia',
        value: 10
    },
    {
        icon : '/images/icon_experience_2.webp',
        label: 'Year Experience',
        value: 7
    },
    {
        icon : '/images/icon_experience_3.webp',
        label: 'Project',
        value: 20
    },
    {
        icon : '/images/icon_experience_4.webp',
        label: 'Kwh installed',
        value: 350000
    },
];

export default function SesnaGroup() {
    return (
        <section>
            <div className="w-full flex flex-col px-6 md:px-20 my-10">
                <h1 className="w-full text-[#15537A] text-center text-2xl font-bold mb-8">EXPERIENCE</h1>
                <div className="w-full flex flex-col md:flex-row">
                    <div className="flex w-full flex-col gap-6">
                        <h1 className="text-[#15537A] text-2xl font-semibold">
                            <span className="text-[#FAC225] font-bold">SESNA</span> Group at A Glance
                        </h1>
                        <p className="text-[#15537A]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare varius nulla, quis aliquam augue varius nec. Morbi malesuada consequat nibh. Aliquam non arcu id lorem consectetur auctor. Phasellus venenatis quam vel erat lacinia pulvinar. Integer a pulvinar metus. Phasellus leo nulla, auctor eget tortor sit amet, egestas convallis mi. Donec nec magna augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                        </p>

                        <p className="text-[#15537A]">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ornare varius nulla, quis aliquam augue varius nec. Morbi malesuada consequat nibh. Aliquam non arcu id lorem consectetur auctor. Phasellus venenatis quam vel erat lacinia pulvinar. Integer a pulvinar metus. Phasellus leo nulla.
                        </p>
                    </div>
                    <div className="w-full relative">
                        <div className="relative w-[250px] h-[340px] m-auto mt-4 md:mt-0">
                            <Image fill src="/images/captain_surya.webp" alt="Captain Surya" />
                        </div>
                    </div>
                </div>
                <div className="w-[300px] mx-auto md:w-full bg-[#15537A] rounded-2xl mt-1">
                    <div className="w-full flex flex-col md:flex-row px-4">
                        {experiences.map(experience => {
                            return (
                                <div className="w-full flex flex-row my-4 items-center gap-2 justify-start" key={experience.label}>
                                    <Image width={100} height={100} src={experience.icon} alt={experience.label} />
                                    <div className="flex flex-col text-white items-center w-full text-center">
                                        <p>More Than</p>
                                        <span className="text-yellow-400 font-bold">{experience.value}</span>
                                        <p>{experience.label}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}