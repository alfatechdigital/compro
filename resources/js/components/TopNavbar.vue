<script setup lang="ts">
import { ref, computed } from 'vue';
import { User } from '@/types/compro';

interface Props {
  currentModuleName?: string;
  searchQuery?: string;
  currentUser?: User;
}

const props = withDefaults(defineProps<Props>(), {
  currentModuleName: 'Dashboard Operasional',
  searchQuery: '',
});

const emit = defineEmits<{
  (e: 'open-quick-add'): void;
  (e: 'toggle-sidebar'): void;
  (e: 'update:searchQuery', query: string): void;
}>();

const showThemeMenu = ref(false);
const showNotificationList = ref(false);
const showUserDropdown = ref(false);

const user = computed(() => props.currentUser || {
  id: 'usr-1',
  name: 'Yuda Permana',
  email: 'admin@alfatech.id',
  role: 'owner',
  title: 'Chief Executive Officer',
  photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  skills: [],
  active: true,
});
</script>

<template>
  <header class="sticky top-0 right-0 left-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/70 dark:border-slate-800 shadow-xs z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors duration-200">
    <!-- Left items: Mobile toggle, breadcrumb, global search -->
    <div class="flex items-center gap-3 sm:gap-4 flex-1">
      <button
        @click="emit('toggle-sidebar')"
        class="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Buka Menu"
      >
        <span class="material-symbols-outlined text-[24px]">menu</span>
      </button>

      <div class="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-xs sm:text-sm font-medium">
        <span class="material-symbols-outlined text-[18px]">hub</span>
        <span class="text-slate-300 dark:text-slate-600">/</span>
        <span class="text-slate-900 dark:text-slate-200 font-semibold truncate">Alfatech</span>
        <span class="text-slate-300 dark:text-slate-600 hidden sm:inline">/</span>
        <span class="text-blue-700 dark:text-blue-400 font-bold hidden sm:inline truncate capitalize">
          {{ currentModuleName }}
        </span>
      </div>

      <!-- Global Search Input -->
      <div class="relative hidden md:block w-72 lg:w-80 ml-2">
        <span class="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-slate-400 dark:text-slate-500">
          search
        </span>
        <input
          :value="searchQuery"
          @input="emit('update:searchQuery', ($event.target as HTMLInputElement).value)"
          class="w-full h-9 pl-9 pr-3 rounded-lg bg-slate-100/80 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-xs sm:text-sm focus:outline-none focus:bg-white dark:focus:bg-slate-800 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 border border-transparent dark:border-slate-700/50 transition-all"
          placeholder="Cari proyek, klien, atau leads... [Ctrl + K]"
          type="text"
        />
      </div>
    </div>

    <!-- Right items: Tambah Cepat, Theme Toggle, Notifikasi, User Info -->
    <div class="flex items-center gap-2 sm:gap-3">
      <button
        @click="emit('open-quick-add')"
        class="flex items-center gap-1.5 bg-[#1e40af] hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 rounded-lg shadow-sm transition-all"
        type="button"
      >
        <span class="material-symbols-outlined text-[18px]">add</span>
        <span class="hidden xs:inline">Tambah Cepat</span>
      </button>

      <!-- Notification Bell -->
      <div class="relative">
        <button
          @click="showNotificationList = !showNotificationList"
          aria-label="Notifikasi"
          class="relative p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors border border-transparent dark:border-slate-800/80"
          type="button"
        >
          <span class="material-symbols-outlined text-[22px]">notifications</span>
          <span class="absolute top-1.5 right-1.5 flex items-center justify-center min-w-[16px] h-4 px-1 rounded-full bg-rose-600 text-white text-[10px] font-bold">
            3
          </span>
        </button>
      </div>

      <!-- User preview -->
      <div class="relative">
        <button
          @click="showUserDropdown = !showUserDropdown"
          class="flex items-center gap-2.5 pl-1 sm:pl-2 border-l border-slate-200 dark:border-slate-700 hover:opacity-90 transition-opacity"
        >
          <div class="relative">
            <img
              :alt="user.name"
              class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-700"
              :src="user.photoUrl"
            />
            <span class="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
          </div>
          <div class="hidden xl:block text-left">
            <div class="text-xs text-slate-900 dark:text-slate-100 font-bold leading-tight truncate">
              {{ user.name }}
            </div>
            <div class="text-[11px] text-slate-500 dark:text-slate-400 leading-tight truncate uppercase">
              {{ user.role }} &bull; {{ user.title || 'Staff' }}
            </div>
          </div>
        </button>
      </div>
    </div>
  </header>
</template>
