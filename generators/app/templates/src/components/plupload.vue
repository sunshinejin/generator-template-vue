<template>
  <div>
    <el-tooltip class="item" effect="dark" :content="`支持扩展名：${acceptFiles}`" placement="bottom-start">
      <el-button id="browseButton" type="primary" icon="el-icon-upload2">
        选择文件
      </el-button>
    </el-tooltip>

    <div v-if="fileRawList.length" class="mt10">
      <el-table :data="fileRawList" class="d2-mt-10 d2-mb-10">
        <el-table-column
          label="文件名"
          min-width="100"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="100"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.status === -1">正在计算MD5</span>
            <span v-if="scope.row.status === 1 && scope.row.percent === 0">MD5计算完成，准备上传</span>
            <span v-if="scope.row.status === 4" style="color: brown">上传失败</span>
            <span v-if="scope.row.status === 5" style="color: chartreuse">已上传</span>
            <el-progress
              v-if="scope.row.percent || scope.row.percent === 0"
              :text-inside="true"
              :stroke-width="20"
              :percentage="scope.row.percent"
              :v-if="scope.row.status === 2 || scope.row.status === 1 && scope.row.percent > 0"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="200"
        >
          <template slot-scope="scope" >
            <div class="flex">

                <el-button :disabled="uploading"  size="small" type="primary" v-if="scope.row.status === 1 " @click="uploadStart()">
                  开始上传
               </el-button>
              <!-- <el-button :disabled="uploading"  size="small" type="primary" v-if="scope.row.status === 4 " @click="uploadStart()">
                   重新上传
               </el-button> -->

            </div>

          </template>
        </el-table-column>
      </el-table>

    </div>
  </div>
</template>
<script>
import plupload from 'plupload/js/plupload.full.min.js'
import FileMd5 from '@/utils/file-md5.js'
import {GetaWayUrl} from '@/api/config/getaWayUrl.js'
export default {
  name: 'Plupload',
  props: {
    // 文件上传类型限制
    acceptFiles: {
      type: String,
      default: ''
    },
    addr: {
      type: String,
      default: ''
    },
    fileList: {
      type: Array,
      default: () => []
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      up: {},
      fileRawList: [],
      uploading: false,
      acceptExtensions: 'gz,jar,war'
    }
  },
  watch: {
    up (val) {
      console.log('up')
      this.fileRawList = this.fileList.concat(val.files)
    },
    acceptFiles (val) {
      console.log('acceptFiles', this.acceptFiles)

      // 处理下后缀，因为拓展名没有.tar.gz gz才有作用
      let handelAccept = this.acceptFiles

      if (handelAccept.includes('.tar.gz')) {
        handelAccept = '.tar.gz,.jar,.war'

        handelAccept = handelAccept.replace(/\.tar\.gz/g, '.gz')
      }

      this.acceptExtensions = handelAccept.replace(/\./g, '')
      this.up.destroy()
      this.pluploadInit()
    }
  },
  mounted () {
    console.log('GetaWayUrl', GetaWayUrl)
    this.pluploadInit()
  },
  methods: {
    pluploadInit () {
      var that = this
      var uploader = new plupload.Uploader({
        browse_button: 'browseButton',
        url: GetaWayUrl + '/xh-cloud/xh-image/v1/upload',
        chunk_size: '512kb',
        headers: {'xh-cloud-token': that.$store.state.user.token},
        multipart: true, // 为true时将以multipart/form-data
        max_retries: 1, // 当发生plupload.HTTP_ERROR错误时的重试次数，为0时表示不重试
        multi_selection: false, // 是否可以在文件浏览对话框中选择多个文件
        filters: {
          mime_types: [
            { extensions: that.acceptExtensions }
          ],
          prevent_duplicates: true // 不允许选取重复文件
        },
        init: {
          BeforeUpload (up, file) {
            // 上传时的附加参数，以键/值对的形式传入
            up.setOption('multipart_params', {
              'md5': file.md5
            })
          },
          FileFiltered (up, files) {
            //  console.log('FileFiltered', up, files)
          },
          FilesAdded (up, files) {
            console.log('FilesAdded', files)

            that.fileRawList.push(...files)

            if (that.fileRawList.length > that.limit) {
              that.deleteFile(that.fileRawList[0])
            }

            files.forEach((f) => {
              f.status = -1
              FileMd5(f.getNative(), (e, md5) => {
                f['md5'] = md5
                f.status = 1
              })
            })
          },
          FilesRemoved (upp, files) {
            that.uploading = false
          },
          FileUploaded (up, file, info) {
            // 上传成功后的处理
            console.log('file', file)
            that.$emit('success', {md5: file.md5, fileName: file.name})
          },
          ChunkUploaded (uploader, file, responseObject) {

          },
          UploadComplete (up, files) {
            that.uploading = false
          },
          Error (up, err) {
            console.log('err', err)
            console.log('up', up.files)
            // up.files[0].status = 1
            up.removeFile(up.files[0])
            that.uploading = false
          }
        }
      })
      uploader.init()
      that.up = uploader
    },
    deleteFile (row) {
      console.log(this.fileRawList.indexOf(row))
      this.fileRawList.splice(this.fileRawList.indexOf(row), 1)
      var file = this.up.getFile(row.id)
      file && this.up.removeFile(file)
    },
    uploadStart () {
      this.uploading = true
      this.up.start()
    }
  }
}
</script>

<style lang="less">
  .el-table td, .el-table th{
    padding: 0
  }

   .el-table td{
     padding: 10px;
   }
</style>
