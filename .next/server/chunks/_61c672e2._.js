module.exports=[61234,e=>{"use strict";e.s(["MAX_ROUNDS",0,10])},1351,e=>e.a(async(t,r)=>{try{var n=e.i(3355),a=e.i(61234),o=e.i(81183),s=e.i(40192),i=e.i(92814),l=t([s,i]);function c(e,t,r,n){if(r)return n?{partnerMessage:"（脸微微泛红）好吧...这次就原谅你了。但你要保证下次不许再这样了！",options:[]}:{partnerMessage:"我不想再跟你说了，我们都冷静一下吧...",options:[]};let a=[{id:"1",content:"对不起，我知道错了",score:10},{id:"2",content:"我给你买你最喜欢吃的蛋糕好不好",score:15},{id:"3",content:"哎呀不就是这点小事吗",score:-15},{id:"4",content:"你能不能别这么无理取闹",score:-25},{id:"5",content:"我错了还不行吗（敷衍）",score:-10},{id:"6",content:"这不是很正常的事吗",score:-20}];return e<0?{partnerMessage:"（冷笑）你还知道来找我？我以为你根本不在乎呢。",options:a}:e<30?{partnerMessage:"哼，我现在不想跟你说话，你自己好好想想吧。",options:a}:e<60?{partnerMessage:"（撇了撇嘴）你说的是真的吗？我才不信呢...",options:a}:{partnerMessage:"（小声）唔...那你下次不许再这样了哦...",options:a}}async function d(e){try{let t,{gender:r,scenario:s,messages:l,affection:d,step:u,isGameOver:p,won:h}=await e.json();(0,o.assertCozeEnv)("POST /api/chat");let R=i.HeaderUtils.extractForwardHeaders(e.headers),g=new i.Config({timeout:3e4}),f=new i.LLMClient(g,R),v="female"===r?"女朋友":"男朋友",m=d<0?"非常生气，冷暴力或激烈质问的语气":d<30?"还在生气，但愿意听对方说话的语气":d<60?"开始软化，嘴上生气但语气缓和":d<80?'快被哄好了，可能撒娇或小声说"哼"':"已经原谅了，但还要对方保证不再犯",w=l.map(e=>({role:"partner"===e.role?"assistant":"user",content:e.content})),E="";if(p){E=h?`你是一个正在被哄好的${v}。
场景：${s}
当前状态：你已经被对方哄好了，心情转晴，但还有点小傲娇。
请用${m}的语气，说一句甜蜜又有点小傲娇的结束对白。
不要加任何解释或说明，只输出对白内容。
长度：20-40字。`:`你是一个非常失望的${v}。
场景：${s}
当前状态：对方没能哄好你，你非常失望和难过，决定结束这段对话。
请用${m}的语气，说一句绝情又带着悲伤的结束对白。
不要加任何解释或说明，只输出对白内容。
长度：20-40字。`;let e=await f.invoke([{role:"system",content:E},{role:"user",content:"请回复："}],{temperature:.9,model:"doubao-seed-2-0-lite-260215"});return n.NextResponse.json({partnerMessage:e.content.trim(),options:[]})}E=`你是一个正在生气的${v}。
场景：${s}
当前好感度：${d}（范围-50到100，初始20，80以上算被哄好）
当前情绪：${m}
当前轮次：第 ${u} 轮 / 共 ${a.MAX_ROUNDS} 轮

你的任务：
1. 根据当前情绪回复对方的话，回复要符合${"female"===r?"她":"他"}的身份和情绪状态
2. 回复长度控制在30-80字之间
3. 可以用括号加入少量动作/表情描述，如（撇过头）（眼眶微红）等
4. 每次回复后，生成6个玩家可以选择的回应选项

6个选项的要求（非常重要）：
- 2个加分选项（+5到+20分）：真诚道歉、具体弥补方案、提起共同回忆等
- 4个减分选项（-5到-30分）：
  - 1-2个普通减分：敷衍、转移话题、找借口
  - 2-3个奇葩搞笑选项：离谱到好笑的程度，比如"要不你也气我一次扯平"这种
- 选项顺序要随机打乱
- 不要在选项中标注哪个是加分哪个是减分
- 每个选项要简短，15字以内

请严格按照以下JSON格式输出，不要有任何其他内容：
{
  "partnerMessage": "你的回复内容",
  "options": [
    {"id": "1", "content": "选项内容1", "score": 10},
    {"id": "2", "content": "选项内容2", "score": -15},
    ...共6个选项
  ]
}

注意：
- 对话要连贯，和之前的内容衔接
- 不要重复之前出现过的话题或选项
- 语气要自然，像真实情侣吵架后的对话
- 奇葩选项要真的很好笑，让人想分享给朋友`;let C=[{role:"system",content:E},...w];(0===w.length||"user"!==w[w.length-1].role)&&C.push({role:"user",content:1===u?"（对方刚开口，等待你的第一反应）":"..."});let y=await f.invoke(C,{temperature:1,model:"doubao-seed-2-0-lite-260215"});try{let e=y.content.match(/\{[\s\S]*\}/);if(e){let r=JSON.parse(e[0]);t={partnerMessage:r.partnerMessage||"",options:Array.isArray(r.options)?r.options.slice(0,6):[]}}else throw Error("No JSON found");if(t.options.length<6)throw Error("Not enough options")}catch(e){(0,o.safeLogError)("POST /api/chat (parse LLM)",e),console.error("[POST /api/chat] Raw response preview:",(0,o.sanitizeSecrets)(y.content)),t=c(d,u,p,h)}return n.NextResponse.json(t)}catch(t){(0,o.safeLogError)("POST /api/chat",t);let e=c(50,1,!1,!1);return n.NextResponse.json(e)}}[s,i]=l.then?(await l)():l,e.s(["POST",()=>d,"maxDuration",0,30,"runtime",0,"nodejs"]),r()}catch(e){r(e)}},!1),22427,e=>e.a(async(t,r)=>{try{var n=e.i(83786),a=e.i(11446),o=e.i(41584),s=e.i(42121),i=e.i(73766),l=e.i(8825),c=e.i(88577),d=e.i(32002),u=e.i(97827),p=e.i(60966),h=e.i(55068),R=e.i(14875),g=e.i(83454),f=e.i(81341),v=e.i(18480),m=e.i(93695);e.i(3499);var w=e.i(90081),E=e.i(1351),C=t([E]);[E]=C.then?(await C)():C;let A=new n.AppRouteRouteModule({definition:{kind:a.RouteKind.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:""},distDir:".next",relativeProjectDir:"",resolvedPagePath:"[project]/src/app/api/chat/route.ts",nextConfigOutput:"standalone",userland:E}),{workAsyncStorage:N,workUnitAsyncStorage:O,serverHooks:S}=A;function y(){return(0,o.patchFetch)({workAsyncStorage:N,workUnitAsyncStorage:O})}async function x(e,t,r){A.isDev&&(0,s.addRequestMeta)(e,"devRequestTimingInternalsEnd",process.hrtime.bigint());let n="/api/chat/route";n=n.replace(/\/index$/,"")||"/";let o=await A.prepare(e,t,{srcPage:n,multiZoneDraftMode:!1});if(!o)return t.statusCode=400,t.end("Bad Request"),null==r.waitUntil||r.waitUntil.call(r,Promise.resolve()),null;let{buildId:E,params:C,nextConfig:y,parsedUrl:x,isDraftMode:N,prerenderManifest:O,routerServerContext:S,isOnDemandRevalidate:T,revalidateOnlyGenerated:P,resolvedPathname:M,clientReferenceManifest:b,serverActionsManifest:$}=o,_=(0,c.normalizeAppPath)(n),H=!!(O.dynamicRoutes[_]||O.routes[M]),U=async()=>((null==S?void 0:S.render404)?await S.render404(e,t,x,!1):t.end("This page could not be found"),null);if(H&&!N){let e=!!O.routes[M],t=O.dynamicRoutes[_];if(t&&!1===t.fallback&&!e){if(y.experimental.adapterPath)return await U();throw new m.NoFallbackError}}let D=null;!H||A.isDev||N||(D=M,D="/index"===D?"/":D);let k=!0===A.isDev||!H,I=H&&!k;$&&b&&(0,l.setManifestsSingleton)({page:n,clientReferenceManifest:b,serverActionsManifest:$});let q=e.method||"GET",j=(0,i.getTracer)(),L=j.getActiveScopeSpan(),F={params:C,prerenderManifest:O,renderOpts:{experimental:{authInterrupts:!!y.experimental.authInterrupts},cacheComponents:!!y.cacheComponents,supportsDynamicResponse:k,incrementalCache:(0,s.getRequestMeta)(e,"incrementalCache"),cacheLifeProfiles:y.cacheLife,waitUntil:r.waitUntil,onClose:e=>{t.on("close",e)},onAfterTaskError:void 0,onInstrumentationRequestError:(t,r,n,a)=>A.onRequestError(e,t,n,a,S)},sharedContext:{buildId:E}},K=new d.NodeNextRequest(e),B=new d.NodeNextResponse(t),X=u.NextRequestAdapter.fromNodeNextRequest(K,(0,u.signalFromNodeResponse)(t));try{let o=async e=>A.handle(X,F).finally(()=>{if(!e)return;e.setAttributes({"http.status_code":t.statusCode,"next.rsc":!1});let r=j.getRootSpanAttributes();if(!r)return;if(r.get("next.span_type")!==p.BaseServerSpan.handleRequest)return void console.warn(`Unexpected root span type '${r.get("next.span_type")}'. Please report this Next.js issue https://github.com/vercel/next.js`);let a=r.get("next.route");if(a){let t=`${q} ${a}`;e.setAttributes({"next.route":a,"http.route":a,"next.span_name":t}),e.updateName(t)}else e.updateName(`${q} ${n}`)}),l=!!(0,s.getRequestMeta)(e,"minimalMode"),c=async s=>{var i,c;let d=async({previousCacheEntry:a})=>{try{if(!l&&T&&P&&!a)return t.statusCode=404,t.setHeader("x-nextjs-cache","REVALIDATED"),t.end("This page could not be found"),null;let n=await o(s);e.fetchMetrics=F.renderOpts.fetchMetrics;let i=F.renderOpts.pendingWaitUntil;i&&r.waitUntil&&(r.waitUntil(i),i=void 0);let c=F.renderOpts.collectedTags;if(!H)return await (0,R.sendResponse)(K,B,n,F.renderOpts.pendingWaitUntil),null;{let e=await n.blob(),t=(0,g.toNodeOutgoingHttpHeaders)(n.headers);c&&(t[v.NEXT_CACHE_TAGS_HEADER]=c),!t["content-type"]&&e.type&&(t["content-type"]=e.type);let r=void 0!==F.renderOpts.collectedRevalidate&&!(F.renderOpts.collectedRevalidate>=v.INFINITE_CACHE)&&F.renderOpts.collectedRevalidate,a=void 0===F.renderOpts.collectedExpire||F.renderOpts.collectedExpire>=v.INFINITE_CACHE?void 0:F.renderOpts.collectedExpire;return{value:{kind:w.CachedRouteKind.APP_ROUTE,status:n.status,body:Buffer.from(await e.arrayBuffer()),headers:t},cacheControl:{revalidate:r,expire:a}}}}catch(t){throw(null==a?void 0:a.isStale)&&await A.onRequestError(e,t,{routerKind:"App Router",routePath:n,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:I,isOnDemandRevalidate:T})},!1,S),t}},u=await A.handleResponse({req:e,nextConfig:y,cacheKey:D,routeKind:a.RouteKind.APP_ROUTE,isFallback:!1,prerenderManifest:O,isRoutePPREnabled:!1,isOnDemandRevalidate:T,revalidateOnlyGenerated:P,responseGenerator:d,waitUntil:r.waitUntil,isMinimalMode:l});if(!H)return null;if((null==u||null==(i=u.value)?void 0:i.kind)!==w.CachedRouteKind.APP_ROUTE)throw Object.defineProperty(Error(`Invariant: app-route received invalid cache entry ${null==u||null==(c=u.value)?void 0:c.kind}`),"__NEXT_ERROR_CODE",{value:"E701",enumerable:!1,configurable:!0});l||t.setHeader("x-nextjs-cache",T?"REVALIDATED":u.isMiss?"MISS":u.isStale?"STALE":"HIT"),N&&t.setHeader("Cache-Control","private, no-cache, no-store, max-age=0, must-revalidate");let p=(0,g.fromNodeOutgoingHttpHeaders)(u.value.headers);return l&&H||p.delete(v.NEXT_CACHE_TAGS_HEADER),!u.cacheControl||t.getHeader("Cache-Control")||p.get("Cache-Control")||p.set("Cache-Control",(0,f.getCacheControlHeader)(u.cacheControl)),await (0,R.sendResponse)(K,B,new Response(u.value.body,{headers:p,status:u.value.status||200})),null};L?await c(L):await j.withPropagatedContext(e.headers,()=>j.trace(p.BaseServerSpan.handleRequest,{spanName:`${q} ${n}`,kind:i.SpanKind.SERVER,attributes:{"http.method":q,"http.target":e.url}},c))}catch(t){if(t instanceof m.NoFallbackError||await A.onRequestError(e,t,{routerKind:"App Router",routePath:_,routeType:"route",revalidateReason:(0,h.getRevalidateReason)({isStaticGeneration:I,isOnDemandRevalidate:T})},!1,S),H)throw t;return await (0,R.sendResponse)(K,B,new Response(null,{status:500})),null}}e.s(["handler",()=>x,"patchFetch",()=>y,"routeModule",()=>A,"serverHooks",()=>S,"workAsyncStorage",()=>N,"workUnitAsyncStorage",()=>O]),r()}catch(e){r(e)}},!1)];

//# sourceMappingURL=_61c672e2._.js.map