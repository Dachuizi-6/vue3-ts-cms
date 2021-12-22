<template>
  <div class="zw-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <!-- <el-col :span="8"> -->
          <el-col :span="8" v-bind="colLayout">
            <el-form-item :label="item.label" :style="formItemStyle">
              <!-- 判断文本框 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <!-- 第一种实现双向数据绑定 -->
                <!-- <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                </el-input> -->
                <!-- 第二种实现表单双向数据绑定 -->
                <el-input
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handelChange($event, item.field)"
                >
                </el-input>
              </template>
              <!-- 判断选择框 -->
              <template v-else-if="item.type === 'select'">
                <!-- <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.title"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select> -->
                <el-select
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handelChange($event, item.field)"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.title"
                    :value="option.value"
                  >
                    {{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <!-- 判断日期框 -->
              <template v-else-if="item.type === 'datePicker'">
                <!-- <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="formData[`${item.field}`]"
                >
                </el-date-picker> -->
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  :model-value="modelValue[item.field]"
                  @update:modelValue="handelChange($event, item.field)"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { IFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    formItemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xs: 24,
        sm: 24,
        md: 12,
        lg: 8,
        xl: 8 // 大屏的时候也一行也显示三个（比较好看）
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 第一种实现双向数据绑定
    // const formData = ref({ ...props.modelValue })
    // watch(
    //   formData,
    //   (newValue) => {
    //     console.log(newValue)
    //     emit('update:modelValue', newValue)
    //   },
    //   {
    //     deep: true
    //   }
    // )

    // 第二种实现双向数据绑定
    const handelChange = (newValue: any, field: string) => {
      emit('update:modelValue', { ...props.modelValue, [field]: newValue })
    }
    return {
      // formData
      handelChange
    }
  }
})
</script>

<style scoped lang="less">
.zw-form {
  padding-top: 22px;
}
</style>
