import { type Plugin } from 'vite'

export default function injectResetRemoteEntryPlugin(): Plugin {
    return {
        name: 'vite-plugin-reset-remote-entry',
        enforce: 'post',
        transform(code: string, id: string) {
            const remotesMapRegex = /((?:const|let|var)\s+remotesMap\s*=)(\s*\{)/;

            if(remotesMapRegex.test(code)) {
                console.log(`[InjectReset] Found remoteMap in: ${id}`);
                const injectionCode = `(window.__RESET_REMOTE_ENTRY__ = function(remoteId) { 
                  if(typeof remotesMap !== 'undefined' && remotesMap[remoteId]) { 
                    const now = (new Date).getTime();
                    
                    const remoteUrl = new URL(remotesMap[remoteId].url)
                    remoteUrl.searchParams.set('v', now)
                    
                    remotesMap[remoteId].url = remoteUrl.toString();
                    remotesMap[remoteId].inited = false;
                    return true; 
                  } 
                  return false; 
                }) &&`;

                const replacedCode = code.replace(remotesMapRegex, `$1 ${injectionCode} $2`);
                // console.log('code', replacedCode)

                return {
                    code: replacedCode,
                    map: null
                }
            }
            return null
        }
    }
}