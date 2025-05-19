import React from 'react'
import { Spinner } from '@blueprintjs/core'

import Pagination from 'components/Pagination'
import HighQuality from './HighQuality'
import Categories, { DEFAULT_CAT } from './Categories'
import SongList from 'components/SongList'
import songListApis from 'apis/songList'
import useAsyncFn from 'hooks/useAsyncFn'
import { PAGE_SIZE, PAGE } from 'constants/pagination'
import styles from './style.module.css'

const { useEffect, useState } = React

const Songlist = () => {
  const [selectedCat, setSelectedCat] = useState(DEFAULT_CAT)
  const [page, setPage] = useState(PAGE)
  const [state, getSonglistsFn] = useAsyncFn(songListApis.getSonglists)
  const [highQualityState, getHighQualitySonglistFn] = useAsyncFn(songListApis.getHighQualitySonglist)
  const [catsState, getSonglistCatsFn] = useAsyncFn(songListApis.getSonglistCats)
  const [hotCatsState, getSonglistHotCatsFn] = useAsyncFn(songListApis.getSonglistHotCats)

  useEffect(() => {
    getSonglistHotCatsFn()
    getSonglistCatsFn()
    getSonglistsFn({ cat: selectedCat })
    getHighQualitySonglistFn(selectedCat)
  }, [])

  const handlePageChange = (page: number) => {
    const offset = (page - 1) * PAGE_SIZE
    getSonglistsFn({ cat: selectedCat, offset })
    setPage(page)
  }

  const handleCatSelect = (cat: string) => {
    getSonglistsFn({ cat, offset: 0 })
    getHighQualitySonglistFn(cat)
    setSelectedCat(cat)
    setPage(PAGE)
  }

  return (
    <div className={styles.root}>
      <div className={styles.highquality}>
        <HighQuality data={highQualityState.value} />
      </div>

      <div className={styles.categories}>
        <Categories
          cats={catsState.value}
          hotCats={hotCatsState.value}
          selectedCat={selectedCat}
          onCatSelect={handleCatSelect}
        />
      </div>

      <div>
        {state.loading ? (
          <Spinner className='spinner' />
        ) : (
          <>
            <SongList data={state.value?.playlists} />
            <div className='pagination'>
              <Pagination page={page} total={state.value?.total} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Songlist
