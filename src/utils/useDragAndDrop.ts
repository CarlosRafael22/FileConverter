import { useEffect, useRef, useState } from 'react'

const useDragAndDrop = (dropHandler: Function) => {
  const dropAreaRef = useRef<HTMLDivElement | null>(null)
  const [isDraggingFile, setIsDraggingFile] = useState(false)
  // let dragCounter: number

  const handleDragIn = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setIsDraggingFile(true)
    }
  }

  const handleDragOut = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDraggingFile(false)
  }

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    console.log('CAIU NO DROP')
    setIsDraggingFile(false)
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      console.log('TEM FILES: ', event.dataTransfer.files)
      dropHandler(event.dataTransfer.files)
      event.dataTransfer.clearData()
      // dragCounter = 0
    }
  }

  useEffect(() => {
    dropAreaRef.current.addEventListener('dragenter', handleDragIn)
    dropAreaRef.current.addEventListener('dragleave', handleDragOut)
    dropAreaRef.current.addEventListener('dragover', handleDragOver)
    dropAreaRef.current.addEventListener('drop', handleDrop)

    return () => {
      dropAreaRef.current.removeEventListener('dragenter', handleDragIn)
      dropAreaRef.current.removeEventListener('dragleave', handleDragOut)
      dropAreaRef.current.removeEventListener('dragover', handleDragOver)
      dropAreaRef.current.removeEventListener('drop', handleDrop)
    }
  })

  return [dropAreaRef, isDraggingFile]
}

export default useDragAndDrop
