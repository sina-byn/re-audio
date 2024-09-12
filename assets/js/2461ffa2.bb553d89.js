"use strict";(self.webpackChunkre_audio=self.webpackChunkre_audio||[]).push([[503],{5335:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>d,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>a});var r=t(4848),i=t(8453);const l={sidebar_position:2},d="API",s={id:"api",title:"API",description:"Audio",source:"@site/docs/api.mdx",sourceDirName:".",slug:"/api",permalink:"/re-audio/docs/api",draft:!1,unlisted:!1,editUrl:"https://github.com/sina-byn/re-audio-4/tree/main/packages/www/docs/api.mdx",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Advanced Usage",permalink:"/re-audio/docs/advanced-usage"}},c={},a=[{value:"Audio",id:"audio",level:2},{value:"Default Repeat",id:"default-repeat",level:3},{value:"Repeat Behavior",id:"repeat-behavior",level:3},{value:"Start Margin",id:"start-margin",level:3},{value:"AudioContext",id:"audiocontext",level:2},{value:"useAudio",id:"useaudio",level:2},{value:"Utils",id:"utils",level:2},{value:"Types",id:"types",level:2}];function o(e){const n={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",h3:"h3",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.header,{children:(0,r.jsx)(n.h1,{id:"api",children:"API"})}),"\n",(0,r.jsx)(n.h2,{id:"audio",children:"Audio"}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"<Audio />"})," component provides the core functionality."]}),"\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:"Props"})}),"\n",(0,r.jsxs)(n.table,{children:[(0,r.jsx)(n.thead,{children:(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.th,{style:{textAlign:"center"}}),(0,r.jsx)(n.th,{style:{textAlign:"center"},children:"Type"}),(0,r.jsx)(n.th,{style:{textAlign:"center"},children:"Default"}),(0,r.jsx)(n.th,{style:{textAlign:"center"},children:"Required"})]})}),(0,r.jsxs)(n.tbody,{children:[(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"playlist"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.a,{href:"#audio-track",children:(0,r.jsx)(n.code,{children:"AudioTrack[]"})})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"---"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u2714\ufe0f"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"defaultMuted"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"boolean"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.a,{href:"#default-repeat",children:"defaultRepeat"})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.a,{href:"#repeat-mode",children:(0,r.jsx)(n.code,{children:"RepeatMode"})})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.code,{children:"'playlist'"})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"defaultShuffle"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"boolean"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.code,{children:"false"})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"defaultVolume"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"number"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"100"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"defaultPlaybackRate"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"number"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"1"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"defaultTrackIndex"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"number"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"0"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.a,{href:"#start-margin",children:"startMargin"})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"number | boolean"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"true"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u274c"})]}),(0,r.jsxs)(n.tr,{children:[(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"children"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:(0,r.jsx)(n.a,{href:"#audio-children",children:(0,r.jsx)(n.code,{children:"AudioChildren"})})}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"---"}),(0,r.jsx)(n.td,{style:{textAlign:"center"},children:"\u274c"})]})]})]}),"\n",(0,r.jsx)(n.h3,{id:"default-repeat",children:"Default Repeat"}),"\n",(0,r.jsxs)(n.p,{children:["Specifies the default ",(0,r.jsx)(n.a,{href:"#repeat-behavior",children:"repeat behavior"})," of the audio player."]}),"\n",(0,r.jsx)(n.h3,{id:"repeat-behavior",children:"Repeat Behavior"}),"\n",(0,r.jsx)(n.p,{children:"There are two repeat behaviors available :"}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"'track'"})," - Repeats the currently playing track"]}),"\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"'playlist'"})," - Repeats the entire playlist"]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["If not specified, the default behavior is ",(0,r.jsx)(n.code,{children:"'playlist'"}),".\r\n",(0,r.jsxs)("p",{children:["The repeat behavior can be controlled using the ",(0,r.jsx)(n.code,{children:"setRepeat"})," method."]})]}),"\n",(0,r.jsx)(n.h3,{id:"start-margin",children:"Start Margin"}),"\n",(0,r.jsx)(n.p,{children:'In many audio players, when a certain amount of time has passed since the track began, clicking the "previous track" button restarts the current track. However, if less time has passed, clicking the button skips to the previous track.'}),"\n",(0,r.jsxs)(n.p,{children:["The ",(0,r.jsx)(n.code,{children:"startMargin"})," prop controls this behavior. It accepts both ",(0,r.jsx)(n.code,{children:"boolean"})," and ",(0,r.jsx)(n.code,{children:"number"})," values:"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Setting it to ",(0,r.jsx)(n.code,{children:"false"})," disables this functionality."]}),"\n",(0,r.jsxs)(n.li,{children:["Setting it to ",(0,r.jsx)(n.code,{children:"true"})," defaults the margin to 5 seconds."]}),"\n",(0,r.jsx)(n.li,{children:"Providing a number will override the default, specifying the number of seconds to use as the margin."}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"audiocontext",children:"AudioContext"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"const audioContext = useAudio();\n"})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"const AudioPlayer = () => <Audio>{audioContext => (...)}</Audio>;\n"})}),"\n",(0,r.jsxs)(n.blockquote,{children:["\n",(0,r.jsx)(n.p,{children:(0,r.jsx)(n.a,{href:"#audio-context",children:"AudioContext Type"})}),"\n"]}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:"audioRef - audio element's ref"}),"\n",(0,r.jsx)(n.li,{children:"playlist"}),"\n",(0,r.jsx)(n.li,{children:"playing"}),"\n",(0,r.jsxs)(n.li,{children:["loading - ",(0,r.jsx)(n.code,{children:"true"})," when loading track's data chunks"]}),"\n",(0,r.jsx)(n.li,{children:"duration"}),"\n",(0,r.jsx)(n.li,{children:"timeLeft"}),"\n",(0,r.jsx)(n.li,{children:"currentTime"}),"\n",(0,r.jsx)(n.li,{children:"muted"}),"\n",(0,r.jsx)(n.li,{children:"shuffle"}),"\n",(0,r.jsx)(n.li,{children:"repeat"}),"\n",(0,r.jsx)(n.li,{children:"volume"}),"\n",(0,r.jsx)(n.li,{children:"playbackRate"}),"\n",(0,r.jsx)(n.li,{children:"trackIndex"}),"\n",(0,r.jsx)(n.li,{children:"currentTrack"}),"\n",(0,r.jsx)(n.li,{children:"play"}),"\n",(0,r.jsx)(n.li,{children:"pause"}),"\n",(0,r.jsx)(n.li,{children:"togglePlay - play/pause"}),"\n",(0,r.jsx)(n.li,{children:"toggleMuted - mute/unmute"}),"\n",(0,r.jsx)(n.li,{children:"toggleShuffle - shuffle/unshuffle playlist"}),"\n",(0,r.jsx)(n.li,{children:"setVolume"}),"\n",(0,r.jsx)(n.li,{children:"setRepeat"}),"\n",(0,r.jsx)(n.li,{children:"setCurrentTime"}),"\n",(0,r.jsx)(n.li,{children:"forwardTrack"}),"\n",(0,r.jsx)(n.li,{children:"rewindTrack"}),"\n",(0,r.jsx)(n.li,{children:"nextTrack"}),"\n",(0,r.jsx)(n.li,{children:"prevTrack"}),"\n",(0,r.jsx)(n.li,{children:"playTrack"}),"\n",(0,r.jsx)(n.li,{children:"setPlaybackRate"}),"\n"]}),"\n",(0,r.jsx)(n.h2,{id:"useaudio",children:"useAudio"}),"\n",(0,r.jsxs)(n.p,{children:["a hook that provides the ",(0,r.jsx)(n.code,{children:"audioContext"})," within the scope of the ",(0,r.jsx)(n.code,{children:"<Audio />"})," component"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"import { useAudio } from 're-audio';\r\n\r\nconst PlayerControls = () => {\r\n  const audioContext = useAudio();\r\n\r\n  return (...);\r\n};\r\n\r\nexport default PlayerControls;\n"})}),"\n",(0,r.jsx)(n.h2,{id:"utils",children:"Utils"}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:"formatTime"})," - used to format :","\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"duration"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"timeLeft"})}),"\n",(0,r.jsx)(n.li,{children:(0,r.jsx)(n.code,{children:"currentTime"})}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"import { useAudio, formatTime } from 're-audio';\r\n\r\nconst TimeDisplay = () => {\r\n  const { duration } = useAudio();\r\n\r\n  return <span>{formatTime(duration)}</span>;\r\n};\r\n\r\nexport default TimeDisplay;\n"})}),"\n",(0,r.jsx)(n.h2,{id:"types",children:"Types"}),"\n",(0,r.jsx)("ul",{children:(0,r.jsx)("li",{id:"repeat-mode",children:(0,r.jsx)(n.strong,{children:"RepeatMode"})})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"type RepeatMode = 'track' | 'playlist';\n"})}),"\n",(0,r.jsx)("ul",{children:(0,r.jsx)("li",{id:"audio-children",children:(0,r.jsx)(n.strong,{children:"AudioChildren"})})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"type AudioChildren = React.ReactNode | ((audioContext: AudioContext) => React.ReactNode);\n"})}),"\n",(0,r.jsx)("ul",{children:(0,r.jsx)("li",{id:"audio-track",children:(0,r.jsx)(n.strong,{children:"AudioTrack"})})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"type AudioTrack = {\r\n  id: string | number;\r\n  src: string;\r\n  type?: string;\r\n  fallbacks?: Pick<AudioTrack, 'src' | 'type'>[];\r\n} & Record<string, unknown>;\n"})}),"\n",(0,r.jsx)("ul",{children:(0,r.jsx)("li",{id:"audio-state",children:(0,r.jsx)(n.strong,{children:"AudioState"})})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"type AudioState = {\r\n  playing: boolean;\r\n  loading: boolean;\r\n  duration: number;\r\n  timeLeft: number;\r\n  currentTime: number;\r\n  muted: boolean;\r\n  shuffle: boolean;\r\n  repeat: RepeatMode;\r\n  volume: number;\r\n  playbackRate: number;\r\n  trackIndex: number;\r\n  currentTrack: AudioTrack;\r\n};\n"})}),"\n",(0,r.jsx)("ul",{children:(0,r.jsx)("li",{id:"audio-context",children:(0,r.jsx)(n.strong,{children:"AudioContext"})})}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"type AudioContext = {\r\n  audioRef: React.RefObject<HTMLAudioElement>;\r\n  playlist: AudioTrack[];\r\n  playing: boolean;\r\n  loading: boolean;\r\n  duration: number;\r\n  timeLeft: number;\r\n  currentTime: number;\r\n  muted: boolean;\r\n  shuffle: boolean;\r\n  repeat: RepeatMode;\r\n  volume: number;\r\n  playbackRate: number;\r\n  trackIndex: number;\r\n  currentTrack: AudioTrack;\r\n  play: () => void;\r\n  pause: () => void;\r\n  togglePlay: () => void;\r\n  toggleMuted: () => void;\r\n  toggleShuffle: () => void;\r\n  setVolume: (newVolume: number) => void;\r\n  setRepeat: (repeat: RepeatMode) => void;\r\n  setCurrentTime: (newCurrentTime: number) => void;\r\n  forwardTrack: (step?: number) => void;\r\n  rewindTrack: (step?: number) => void;\r\n  nextTrack: () => void;\r\n  prevTrack: () => void;\r\n  playTrack: (trackIndex: number) => void;\r\n  setPlaybackRate: (newPlaybackRate: number) => void;\r\n};\n"})})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}}}]);