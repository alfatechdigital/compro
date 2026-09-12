<script setup lang="ts">
import { ref, computed } from 'vue';
import { UserRole, User } from '@/types/compro';

interface Props {
  activeModule?: string;
  currentUser?: User;
}

const props = withDefaults(defineProps<Props>(), {
  activeModule: 'dashboard',
});

const emit = defineEmits<{
  (e: 'navigate', moduleId: string): void;
  (e: 'close-mobile'): void;
}>();

const showUserMenu = ref(false);
const theme = ref<'light' | 'dark' | 'system'>('system');

const user = computed(() => props.currentUser || {
  id: 'usr-1',
  name: 'Yuda Permana',
  email: 'admin@alfatech.id',
  role: 'owner' as UserRole,
  skills: ['Laravel', 'Vue.js', 'TypeScript'],
  active: true,
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  title: 'Chief Executive Officer'
});

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'proyek', label: 'Proyek', icon: 'folder_open' },
  { id: 'crm-leads', label: 'Leads / CRM', icon: 'group' },
  { id: 'profil-perusahaan', label: 'Profil Perusahaan', icon: 'apartment' },
  { id: 'portofolio', label: 'Portofolio', icon: 'work' },
  { id: 'konten-medsos', label: 'Konten Medsos', icon: 'share' },
  { id: 'keuangan', label: 'Keuangan', icon: 'account_balance_wallet', restrictedTo: ['owner', 'ceo'] },
  { id: 'tim', label: 'Tim', icon: 'how_to_reg', restrictedTo: ['owner', 'ceo'] },
  { id: 'pengaturan', label: 'Pengaturan & Tema', icon: 'settings', restrictedTo: ['owner', 'ceo', 'staff'] }
];

function canAccess(item: typeof navItems[number]): boolean {
  if (!item.restrictedTo) return true;
  return item.restrictedTo.includes(user.value.role);
}

function handleSelect(id: string) {
  emit('navigate', id);
  emit('close-mobile');
}
</script>

<template>
  <aside class="w-72 bg-[#1e2538] dark:bg-slate-950 text-[#eef0ff] flex flex-col shadow-xl border-r border-white/5 dark:border-slate-800 h-screen sticky top-0">
    <!-- Brand Header -->
    <div class="h-16 px-5 flex items-center gap-3 bg-[#1e2538] dark:bg-slate-950 border-b border-white/5 dark:border-slate-800/80">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1e40af] to-[#006398] flex items-center justify-center text-white shadow-md flex-shrink-0">
        <span class="material-symbols-outlined text-[22px]">hub</span>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-base text-[#eef0ff] tracking-tight truncate font-bold leading-tight">
          Alfatech Office
        </span>
        <span class="text-[11px] text-[#b8c4ff] dark:text-slate-400 truncate font-medium">
          PT Alfatech Digital Solutions
        </span>
      </div>
    </div>

    <!-- Status Pill -->
    <div class="px-5 py-3">
      <div class="px-3 py-1.5 rounded-lg bg-white/5 dark:bg-slate-900/80 text-[#eef0ff] text-xs font-semibold flex items-center justify-between border border-white/5 dark:border-slate-800">
        <span class="tracking-wider uppercase text-[10px] text-[#dde1ff] dark:text-slate-400">
          OPERATIONAL PORTAL
        </span>
        <span class="flex h-2 w-2 relative">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fd298] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-[#3fd298]"></span>
        </span>
      </div>
    </div>

    <!-- Navigation Menu -->
    <nav class="flex-1 px-3 py-1 space-y-1 overflow-y-auto">
      <button
        v-for="item in navItems"
        :key="item.id"
        @click="canAccess(item) && handleSelect(item.id)"
        :disabled="!canAccess(item)"
        :class="[
          'w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left',
          activeModule === item.id
            ? 'bg-[#1e40af] dark:bg-blue-600 text-white font-bold shadow-md shadow-[#1e40af]/30'
            : canAccess(item)
            ? 'text-[#eef0ff]/80 dark:text-slate-300 hover:bg-white/10 dark:hover:bg-slate-900 hover:text-white font-medium'
            : 'text-[#eef0ff]/30 dark:text-slate-600 cursor-not-allowed font-normal'
        ]"
      >
        <div class="flex items-center gap-3 min-w-0">
          <span
            :class="[
              'material-symbols-outlined text-[20px] flex-shrink-0',
              activeModule === item.id ? 'text-white' : 'text-[#eef0ff]/70 dark:text-slate-400 group-hover:text-white'
            ]"
          >
            {{ item.icon }}
          </span>
          <span class="text-xs sm:text-sm tracking-normal truncate">{{ item.label }}</span>
        </div>
        <span v-if="!canAccess(item)" class="material-symbols-outlined text-[15px] text-white/30" title="Akses Dibatasi Role">
          lock
        </span>
      </button>
    </nav>

    <!-- Role & Persona Switcher Panel -->
    <div class="p-3.5 bg-[#1e2538] dark:bg-slate-950 border-t border-white/10 dark:border-slate-800 relative">
      <div
        @click="showUserMenu = !showUserMenu"
        class="rounded-xl bg-white/5 dark:bg-slate-900 hover:bg-white/10 dark:hover:bg-slate-800/80 p-2.5 flex items-center gap-3 cursor-pointer transition-colors border border-white/5 dark:border-slate-800 group"
      >
        <div class="relative flex-shrink-0">
          <img
            :alt="user.name"
            class="w-9 h-9 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-[#1e40af] transition-all"
            :src="user.photoUrl"
          />
          <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#3fd298] rounded-full ring-2 ring-[#1e2538]"></span>
        </div>
        <div class="min-w-0 flex-1">
          <p class="text-xs font-bold text-[#eef0ff] truncate leading-tight">
            {{ user.name }}
          </p>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span class="text-[10px] uppercase font-bold px-1.5 py-0.2 rounded bg-white/15 dark:bg-slate-800 text-[#dde1ff]">
              {{ user.role }}
            </span>
            <span class="text-[11px] text-[#b8c4ff] dark:text-slate-400 truncate font-normal">
              {{ user.title }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
