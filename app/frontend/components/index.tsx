'use client';

import { Suspense, lazy } from 'react'

interface IndexProps { path: string, viewData?: string }

const index = ({ path, viewData: data }: IndexProps) => {
  const viewDataMap = JSON.parse(data ?? '{}')
  const viewData = viewDataMap && Object.keys(viewDataMap).length !== 0 ? viewDataMap : null

  const AsyncComponent = lazy(() => import(/* @vite-ignore */`./${path}`))

  return (
    <Suspense fallback={loading()}>
      <AsyncComponent { ...(viewData && { viewData }) } />
    </Suspense>
  )
}

function loading() {
  return <div>Loading...</div>
}

export default index
