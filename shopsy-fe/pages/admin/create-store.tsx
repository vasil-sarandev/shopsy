import { FC } from 'react'
import { CreateStoreContainer } from '../../feature/admin/ create-store'
import { withAuthentication } from '../../feature/auth'

interface Props {}

const CreateStorePage: FC<Props> = () => <CreateStoreContainer />

export default withAuthentication(CreateStorePage)
