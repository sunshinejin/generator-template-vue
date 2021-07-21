import SparkMD5 from 'spark-md5'
export default function(file, callback) {
  
  var blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice
  var chunkSize = 2097152 // Read in chunks of 2MB
  var chunks = Math.ceil(file.size / chunkSize)
  var currentChunk = 0
  var spark = new SparkMD5.ArrayBuffer()
  var fileReader = new FileReader()

  fileReader.onload = function(e) {
    console.log('read chunk nr', currentChunk + 1, 'of', chunks)
    spark.append(e.target.result) // Append array buffer
    currentChunk++

    if (currentChunk < chunks) {
      loadNext()
    } else {
      callback(null, spark.end())
      console.log('finished loading')
    }
  }

  fileReader.onerror = function() {
    callback('oops, something went wrong.')
  }

  // 分次读取大文件的内容，
  function loadNext() {
    var start = currentChunk * chunkSize
    var end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize

    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end))
  }

  loadNext()
}