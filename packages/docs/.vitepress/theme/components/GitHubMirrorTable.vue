<template>
    <div class="container">
        <div class="stat-row" v-if="mirrorList.length">
            <span class="tag total">
                <!-- 换成统计列表图标，不再是房子 -->
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                    stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;margin-right:4px;">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                {{ mirrorList.length }} 个镜像
            </span>
            <span class="tag ok">● {{ countOk }} 正常</span>
            <span class="tag error">● {{ countError }} 超时</span>
            <span class="tag unsupported">● {{ countUnsupported }} 不支持</span>
        </div>

        <p class="loading" v-if="loading">数据加载中...</p>
        <p class="error" v-else-if="errorMsg">加载失败：{{ errorMsg }}</p>

        <table v-if="mirrorList.length">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>镜像</th>
                    <th>延迟</th>
                    <th>速度</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in mirrorList" :key="item.key">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.label }}</td>
                    <td>{{ item.latency ? `${item.latency} ms` : '—' }}</td>
                    <td>{{ item.speed ? `${item.speed} MB/s` : '—' }}</td>
                    <td>
                        <span class="status-tag" :class="item.statusClass">
                            {{ item.statusText }}
                        </span>
                    </td>
                    <td class="op-col">
                        <button class="copy-btn" :disabled="item.rawStatus !== 'ok'" @click="copyText(item.label)">
                            复制
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
const API_URL = 'https://hiwiki.org/data/mirror-speeds.json'
const loading = ref(true)
const errorMsg = ref('')
const rawMirrors = ref([])

const mirrorList = computed(() => {
    return rawMirrors.value.map(item => {
        let statusText, statusClass
        const rawStatus = item.status

        if (rawStatus === 'ok') {
            statusText = '正常'
            statusClass = 'tag-ok'
        } else if (rawStatus === '404') {
            statusText = '不支持'
            statusClass = 'tag-unsupported'
        } else if (rawStatus === 'error') {
            statusText = '超时'
            statusClass = 'tag-error'
        } else {
            statusText = '超时'
            statusClass = 'tag-error'
        }

        return {
            ...item,
            rawStatus,
            statusText,
            statusClass
        }
    })
})

const countOk = computed(() => mirrorList.value.filter(i => i.rawStatus === 'ok').length)
const countUnsupported = computed(() => mirrorList.value.filter(i => i.rawStatus === '404').length)
const countError = computed(() => mirrorList.value.filter(i => i.rawStatus === 'error').length)

async function copyText(text) {
    try {
        await navigator.clipboard.writeText(text)
        alert('复制成功：' + text)
    } catch (e) {
        alert('复制失败，请手动复制')
    }
}

async function fetchData() {
    try {
        loading.value = true
        errorMsg.value = ''
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        rawMirrors.value = data.mirrors
    } catch (err) {
        errorMsg.value = err.message + '（可能存在跨域限制）'
    } finally {
        loading.value = false
    }
}

onMounted(fetchData)
</script>

<style scoped>
.container {
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px 0;
}

.stat-row {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 12px;
    font-size: 14px;
    flex-wrap: wrap;
}

.tag.total {
    color: #333;
    display: flex;
    align-items: center;
}

.tag.ok {
    color: #059669;
}

.tag.error {
    color: #dc2626;
}

.tag.unsupported {
    color: #b45309;
}

.loading {
    color: #888;
}

.error {
    color: #dc2626;
}

table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

th,
td {
    border: 1px solid #e5e7eb;
    padding: 8px 10px;
    text-align: left;
}

th {
    background: #f9fafb;
}

.status-tag {
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
}

.tag-ok {
    background: #dcfce7;
    color: #059669;
}

.tag-error {
    background: #fee2e2;
    color: #dc2626;
}

.tag-unsupported {
    background: #fef3c7;
    color: #b45309;
}

.op-col {
    width: 80px;
    text-align: center;
}

.copy-btn {
    border: none;
    background: #3b82f6;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
}

.copy-btn:hover {
    background: #2563eb;
}

.copy-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
}

/* 暗色模式兼容  */
:deep(.dark) th {
    background-color: #334155;
}
:deep(.dark) th, :deep(.dark) td {
    border-color: #475569;
}
</style>
