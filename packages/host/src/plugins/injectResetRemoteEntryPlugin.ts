import { type Plugin } from 'vite'

/**
 * @originjs/vite-plugin-federation 을 통하여 생성된 코드를 기준으로 remotesMap 핸들링을 위한 펑션을 삽입
 *
 * 리모트 서비스의 신규 릴리즈가 발생하여 remoteEntry.js 파일이 갱신될 경우, federation 호출 시 404 오류가 발생한다.
 * 해당 오류가 발생할 경우, remoteEntry.js 파일을 다시 읽어들일 수 있도록 외부에 함수를 노출한다.
 */
export default function injectResetRemoteEntryPlugin(): Plugin {
    return {
        name: 'vite-plugin-reset-remote-entry',
        enforce: 'post',
        transform(code: string, id: string) {
            const remotesMapRegex = /((?:const|let|var)\s+remotesMap\s*=)(\s*\{)/;

            if(remotesMapRegex.test(code)) {
                // id => virtual:__federation__
                // console.log(`[InjectReset] Found remoteMap in: ${id}`);
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