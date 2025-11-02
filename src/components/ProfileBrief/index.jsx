import React from 'react'
import HeaderCard from './HeaderCard'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/src/hooks/useAuth'

function ProfileBrief() {
    const {user} = useAuth();
    return (
        <div className="gap-4 justify-center w-full">
            {/* Top welcome card */}

            {/* Additional Info Section */}
            <div className=" w-fit mx-auto">

                    <HeaderCard
                        image="/images/tutor-image-preview.png"
                        title={`Welcome back, ${user?.firstName || "User"}!`}
                        subtitle="Find any feature or setting quickly."
                    />
                    {/* Section Header */}
                    <div className='bg-gray-100 p-6 rounded-lg'>

                    <HeaderCard
                        image="/icons/additionalDetails.png"
                        title="Additional information is required"
                        subtitle="These steps are required to provide best quality services to both students and tutors"
                        />
                

                {/* Action Cards */}
                <div className="flex justify-center gap-6 mt-6">
                    {/* Profile completion card */}
                    <div className="flex flex-col justify-between bg-yellow-400 p-6 w-full rounded-2xl shadow-md">
                        {/* Top: icon + text */}
                        <div className="flex items-start gap-3">
                            <Image
                                src="/icons/profileCard.png"
                                alt="profile"
                                width={40}
                                height={40}
                                className="rounded-lg"
                                />
                            <div>
                                <h2 className="font-semibold text-black">
                                    Complete your profile’s information
                                </h2>
                                <p className="text-sm text-black">
                                    Here is a lot you can do with us
                                </p>
                            </div>
                        </div>

                        {/* Bottom: chevron button centered */}
                        <div className="flex justify-end mt-6">
                            <Link href={"/account-settings"} className="bg-white p-3 rounded-lg shadow flex justify-center items-center">
                                <Image
                                    src="/icons/chevron-right.png"
                                    alt="right"
                                    width={10}
                                    height={10}
                                    />
                            </Link>
                        </div>
                    </div>


                    {/* Payment credentials card */}
                    <div className="flex flex-col justify-between bg-white p-6 w-full rounded-2xl shadow-md">
                        {/* Top: icon + text */}
                        <div className="flex items-start gap-3">
                            <Image
                                src="/icons/profileCardInv.png"
                                alt="profile"
                                width={40}
                                height={40}
                                className="rounded-lg"
                                />
                            <div>
                                <h2 className="font-semibold text-black">
                                    Complete your profile’s information
                                </h2>
                                <p className="text-sm text-black">
                                    Here is a lot you can do with us
                                </p>
                            </div>
                        </div>

                        {/* Bottom: chevron button centered */}
                        <div className="flex justify-end mt-6">
                            <Link href={"/teacher-registration"} className="bg-black p-3 rounded-lg shadow flex justify-center items-center">
                                <Image
                                    src="/icons/chevron-right.png"
                                    alt="right"
                                    width={10}
                                    height={10}
                                    className='filter invert'
                                    />
                            </Link>
                        </div>
                    </div>
                                    </div>

                </div>
            </div>
        </div>
    )
}

export default ProfileBrief
