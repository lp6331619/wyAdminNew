import E from "wangeditor"
export default {
  name: 'Detail',
  props: {
    initData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 场景
    scene: {
      // edit detail create
      type: String,
      default: ''
    },
    // 权限
    operatePriv: {
      type: Object,
      default: () => {
        return {}
      }
    },
    prepare: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  watch: {
    initData: {
      handler(newValue, oldValue) {
        this.dataBox = newValue
        console.log(newValue, oldValue)
      },
      deep: true
    }
  },
  data() {
    return {
      dataBox: undefined,
      loading: false,
      editor: null,
      edit: false,
      form: {
        displayOrder: '',
        cate_id: null,
        content: '',
        status: '',
        title: '',
        id: ''
      },
      Rules: {
        cate_id: [{ required: true, trigger: 'change', message: '不能为空!' }],
        displayOrder: [{ required: true, trigger: 'change', message: '不能为空!' }],
        content: [{ required: true, trigger: 'change', message: '不能为空!' }],
        status: [{ required: true, trigger: 'change', message: '不能为空!' }],
        title: [{ required: true, trigger: 'change', message: '不能为空!' }]
      }
    }
  },
  computed: {
    id() {
      return this.$route.query.id ? JSON.parse(this.$route.query.id) : null
    },
    update() {
      return this.$route.query.edit ? JSON.parse(this.$route.query.edit) : false
    }
  },
  created() {
    switch (this.scene) {
      case 'detail':
        this.edit = this.update
        this.dataBox = this.initData
        break;
      case 'edit':
        this.edit = this.update
        this.dataBox = this.initData
        this.$nextTick(function () {
          this.editorElemBox()
        })
        break;
      case 'create':
        break;
    }
  },
  mounted() {
    this.scene === 'edit' || this.scene === 'create' ?
      this.createEditor() : ''
  },
  methods: {
    editorElemBox() {
      this.edit = true
      this.form = {
        displayOrder: this.dataBox.displayOrder,
        cate_id: this.dataBox.cate.id,
        content: this.dataBox.content,
        status: this.dataBox.status.key,
        title: this.dataBox.title,
        id: this.dataBox.id
      }
      this.$nextTick(() => {
        this.createEditor()
      })
    },
    createEditor() {
      this.editor = new E(this.$refs.editorElem)
      // // 编辑器的事件，每次改变会获取其html内容
      this.editor.customConfig.onchange = html => {
        this.form.content = html
      }

      this.editor.customConfig.menus = [
        // 菜单配置
        'head', // 标题
        'bold', // 粗体
        'fontSize', // 字号
        'fontName', // 字体
        'italic', // 斜体
        'underline', // 下划线
        'strikeThrough', // 删除线
        'foreColor', // 文字颜色
        'backColor', // 背景颜色
        'link', // 插入链接
        'list', // 列表
        'justify', // 对齐方式
        'quote', // 引用
        'emoticon', // 表情
        'image', // 插入图片
        'table', // 表格
        'code', // 插入代码
        'undo', // 撤销
        'redo' // 重复
      ]
      this.editor.create() // 创建富文本实例
      this.editor.txt.html(this.form.content)
    },
    sub() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('outData', this.form)
        }
      })
    },
    cancel() {
      this.edit = false
      this.$emit('cancel', true)
    }
  }

}
