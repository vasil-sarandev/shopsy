import { FC, useCallback, useState } from 'react'
import { debounce } from 'lodash'
import {
  FetchResponseHandler,
  Pagination,
  initialStateQuery,
  Page,
  Input,
  usePaginationFetchWithFilter,
  Store
} from '../../../shared'
import styles from '../styles/container.module.css'
import { SuperAdminService } from '../service'
import { StoreCard } from '../component'

interface Props {}

const initialQueryState = initialStateQuery({ limit: 5, count: true })

export const SuperAdminContainer: FC<Props> = () => {
  const [filterValue, setFilterValue] = useState('')
  const [filter, setFilter] = useState('')
  const [queryState, setQueryState] = useState<Page>(initialQueryState)
  const { error, isLoading, isLoadingMore, items, pagination } = usePaginationFetchWithFilter({
    getData: SuperAdminService.fetchStores,
    ...queryState,
    filter
  })

  const loadMoreData = (): void => {
    setQueryState({ ...queryState, next: pagination.next })
  }

  const handleFilterChange = (val) => {
    setQueryState(initialQueryState)
    setFilter(val)
  }

  // eslint-disable-next-line camelcase
  const debounced_filter_change = useCallback(debounce(handleFilterChange, 750), [])

  const storesList = items.map((x: Store) => <StoreCard store={x} key={x.slug} />)

  return (
    <>
      <div className={styles.filterContainer}>
        <Input
          name='filter'
          onChange={(name, val) => {
            setFilterValue(val)
            debounced_filter_change(val)
          }}
          placeholder='Потърсете магазин...'
          value={filterValue}
          autoComplete='off'
        />
      </div>
      <FetchResponseHandler loading={isLoading} error={error} showSkeleton>
        <div className={styles.listContainer}>{storesList}</div>
      </FetchResponseHandler>
      <Pagination
        loading={isLoadingMore}
        total={pagination.count}
        count={items.length}
        cmsTexts={{ countInfoText: 'магазини показани' }}
        onLoadMore={loadMoreData}
      />
    </>
  )
}
