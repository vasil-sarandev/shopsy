import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload as UploadComponent } from 'antd'
import 'antd/es/upload/style/index.css'
import 'antd/es/modal/style/index.css'
import 'antd/es/slider/style/index.css'
import { FC } from 'react'
import ImgCrop from 'antd-img-crop'
import { UploadListType } from 'antd/lib/upload/interface'

export interface UploadProps {
  value: any
  onChange: (name: string, value: any) => void
  name: string
  label?: string
  aspect: number
  listType?: UploadListType
  maxCount?: number
}

export const Upload: FC<UploadProps> = ({
  name,
  value,
  onChange,
  label,
  maxCount = 1,
  aspect = 1 / 1,
  listType = 'picture'
}) => {
  const handleChange = ({ file }) => {
    const newFileList = [...value, file]
    onChange(name, newFileList)
  }

  const onPreview = async (file) => {
    let src = file.url
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(file.originFileObj)
        reader.onload = () => resolve(reader.result)
      })
    }
    const image = new Image()
    image.src = src
    const imgWindow = window.open(src)
    imgWindow.document.write(image.outerHTML)
  }
  const beforeUpload = (file) => {
    handleChange({ file })
    return false
  }
  return (
    <div className='upload-container'>
      {label && <div className='label'>{label}</div>}
      <ImgCrop aspect={aspect} quality={100}>
        <UploadComponent
          fileList={value}
          maxCount={maxCount}
          listType={listType}
          onPreview={onPreview}
          beforeUpload={beforeUpload}
          onRemove={(file) => {
            const newValue = value.filter((x) => x.uid !== file.uid)
            onChange(name, newValue)
          }}
        >
          <Button icon={<UploadOutlined />} block>
            Upload
          </Button>
        </UploadComponent>
      </ImgCrop>
      <style jsx>{`
        .label {
          margin-bottom: 5px;
        }
        .upload-container {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  )
}
