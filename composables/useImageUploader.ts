// src/composables/useImageUploader.ts
import { ref } from 'vue';

export function useImageUploader(uploadUrl = '/api/upload') {
    const file        = ref<File | null>(null);
    const preview     = ref<string | null>(null);
    const uploadedUrl = ref<string | null>(null);
    const progress    = ref<number>(0);
    const loading     = ref<boolean>(false);
    const error       = ref<Error | null>(null);
    const success     = ref<boolean>(false);
    function onFileChange(event: Event) {
        const target   = event.target as HTMLInputElement;
        const selected = target.files?.[0] ?? null;
        if (!selected) return;

        file.value    = selected;
        preview.value = URL.createObjectURL(selected);
        error.value   = null;
        success.value = false;
        progress.value = 0;
        uploadedUrl.value = null;
    }

    async function upload(): Promise<void> {
        if (!file.value) {
            error.value = new Error('Aucun fichier sélectionné.');
            return;
        }
        loading.value = true;
        error.value   = null;
        progress.value = 0;

        try {
            const res = await new Promise<{ url: string }>((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.open('POST', uploadUrl);
                xhr.responseType = 'json';

                xhr.upload.onprogress = (e: ProgressEvent) => {
                    if (e.lengthComputable) {
                        progress.value = Math.round((e.loaded / e.total) * 100);
                    }
                };

                xhr.onload = () => {
                    if (xhr.status >= 200 && xhr.status < 300 && xhr.response?.url) {
                        resolve(xhr.response as { url: string });
                    } else {
                        reject(new Error(`Échec de l’upload : ${xhr.statusText || xhr.status}`));
                    }
                };
                xhr.onerror = () => reject(new Error('Erreur réseau pendant l’upload.'));

                const formData = new FormData();
                formData.append('file', file.value!);
                xhr.send(formData);
            });

            uploadedUrl.value = res.url;
            preview.value     = res.url;
            success.value     = true;
        } catch (err: any) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    }

    return {
        file,
        preview,
        uploadedUrl,
        progress,
        loading,
        error,
        success,
        onFileChange,
        upload,
    };
}
