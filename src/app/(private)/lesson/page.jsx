import VideoCallContainer from '@/src/components/VideoCall/VideoCall'
import React, { Suspense } from 'react'

function page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>

        <VideoCallContainer></VideoCallContainer>
      </Suspense>
    </div>
  )
}

export default page