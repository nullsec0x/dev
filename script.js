const terminal = document.getElementById("terminal");
const input = document.getElementById("terminal-input");
const blinker = document.getElementById("blinker");

const history = [];
let historyIndex = -1;

function updatePrompt() {
  const inputLinePrompt = document.querySelector('.line .prompt');
  if (inputLinePrompt) {
    const currentPrompt = window.sshMode ? "nullsec0x@ubuntustation ~ %" : "you@nullsec0x.dev ~ %";
    inputLinePrompt.textContent = currentPrompt;
  }
}

const commands = {
    help: `Available commands:
  
    ls
      Lists all available files
      Example: ls
  
    cat 
      Reads and displays the contents of a file
      Example: cat about.md
      Example: cat faq.md
  
    whoami
      Displays information about the current user
      Example: whoami
  
    clear
      Clears the terminal screen
      Example: clear
  
    help
      Shows this help message with command descriptions and examples
      Example: help
  
    github
      Opens my GitHub profile
      Example: github

    instagram
      Opens my Instagram profile
      Example: instagram
  
    tech-stack
      Displays My Tech Stack 
      Example: tech-stack

    light
      Switches to light mode
      Example: light

    dark
      Switches to dark mode
      Example: dark

Note: Commands are case-sensitive. Type them exactly as shown`,
    ls: "about.md  projects.md  faq.md  hackathons.md",
    "cat about.md": "I'm nullsec0x — a developer who loves low-level things, good UI, and breaking + building stuff.",

    light: () => {
        document.body.classList.add('light-mode');
        appendLine('Switched to light mode.', 'output');
    },
    dark: () => {
        document.body.classList.remove('light-mode');
        appendLine('Switched to dark mode.', 'output');
    },

    instagram: () => window.open("https://www.instagram.com/4f6d6172", "_blank"),

    "cat hackathons.md": `# Hackathons

  ## Hack Club ScrapYard (Casablanca, March 2025)
    - 2-day hardware/software hackathon
    - Theme: scrap stuff together, break things, win stuff
    - Team: laformatik
    - Built: Scrapy Meme Generator
    - Link: <a href="https://nullsec0x.github.io" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io</a>
    - Weird project. Did damage. Got prizes.


  ## AI Crafters x Manus AI (July 2025)
    - AI-focused hackathon (short format)
    - Built: terminal-based system monitoring tool (Unix + Windows)
    - Tech: Python (cross-platform, low dependency)
    - Repo: <a href="https://github.com/nullsec0x/sysinfo" target="_blank" style="text-decoration: underline; color: inherit;">https://github.com/nullsec0x/sysinfo</a>
    - My role: wrote all of it
    - Made it to finals. Solid run.
    `,

    "cat projects.md": `# Projects
  
  ## Random Meme Generator  
  A fun tool that generates random memes on the fly. (made by Laformatik <3)  
  <a href="https://nullsec0x.github.io/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/</a>
  
  ## Proposal Website  
  She won't say no I PROMISE.  
  <a href="https://nullsec0x.github.io/-3/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/-3/</a>

  ## Bac National Exam And Average Calculator
  Made this cuz math is pain and other tools have trash UI and ads. (It works tho.)
  <a href="https://nullsec0x.github.io/bac/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/bac/</a>

  ## Korean Cafe Menu
  Built a fake cafe website because I was hungry and bored. No food, just jazz.
  <a href="https://nullsec0x.github.io/cafe/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/cafe/</a>

  ## WatchWhat!  
  Can’t pick a movie? Spin the wheel and get a banger by vibe, year, or rating.  
  <a href="https://nullsec0x.github.io/watchwhat/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/watchwhat/</a>

  ## What Is My IP Address?  
  No ads, no trackers, just your IP — clean, simple, sickass-styled.  
  <a href="https://nullsec0x.github.io/ipadress/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/ipadress/</a>

  ## FocusFi  
  Helps you get stuff done… once your task list looks good.
  <a href="https://nullsec0x.github.io/focusfi/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/focusfi/</a>

  ## Dream Debugger
  A simulation of a programmer's sleep and debugging, a sick and unique experience.
  <a href="https://nullsec0x.github.io/dreamdebugger/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/dreamdebugger/</a>


  ## Function Grapher
  Graphs mathematical functions, an sick ass tool for visualization.
  <a href="https://nullsec0x.github.io/functiongrapher/" target="_blank" style="text-decoration: underline; color: inherit;">https://nullsec0x.github.io/functiongrapher/</a>

  ## SysInfo
  A terminal-based Python tool that monitors system information for both UNIX and Windows.
  <a href="https://github.com/nullsec0x/sysinfo/" target="_blank" style="text-decoration: underline; color: inherit;">https://github.com/nullsec0x/sysinfo/</a>

 
  More projects available on my <a href="https://github.com/nullsec0x" target="_blank" style="text-decoration: underline; color: inherit;">GitHub</a>!`,
    "cat faq.md": `# FAQ
  
  **Q: Who is nullsec0x?**
  A: A tech enthusiast coding up cool stuff and building epic hardware setups.
  
  **Q: What do you specialize in?**
  A: Fullstack development, shell scripting, and some serious codecraft.
  
  **Q: How can I reach you?**
  A: Drop me a line at <a href="mailto:nullsec0x@proton.me" style="text-decoration: underline;">nullsec0x@proton.me</a> or find me on GitHub and Reddit.  
  
  **Q: Are you open to freelance work?**
  A: Yep! Always looking for cool projects to contribute to.
  
  **Q: What’s your favorite tech?**
  A: React, Node.js, split keyboards, Linux, and anything open-source.
  
  **Q: Fun fact?**
  A: 9/11 was an inside job :3`,

  "tech-stack": `Nullsec0x’s Tech Stack 💻
  - Languages: JavaScript, Python, C++, CSS, TypeScript, Ruby
  - Frameworks: React, Node.js, Vue.js
  - OS: Linux (obviously)
  - Hardware: twinkpad, tinkering and more!`,

    whoami: "user: nullsec0x\nrole: script kiddie fullstack dev wannabe\nlocation: the cloud",

    github: () => window.open("https://github.com/nullsec0x", "_blank"),

    clear: "clear",    

    "sudo -su": `Nice try, but I don’t trust you with root access.
Try 'sudo make me a sandwich' instead.`,

    nullsec0x: "yup! that's me :D",

    echo: (input) => input,

    "which $SHELL": "/bin/zsh",
    
    "sudo shutdown -h now": () => {
      document.body.classList.add('crt-shutdown');

          setTimeout(() => {
              window.close(); 
              if(!window.closed) {
                  window.location.href = 'about:blank';
              }
          }, 1000);
    }, 

  fraisazwina: `
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⣀⣄⣀⠀⠠⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡿⠉⠉⣹⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⠀⠀⠐⠀⢀⠃⠀⣿⠀⠀⣼⠏⠀⠰⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⣠⡾⠳⠶⢶⣄⡀⠀⢸⡇⠀⣼⣧⣤⣤⡀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⢻⣆⠀⠀⠀⠈⠻⢦⣼⠃⣰⡟⠋⢀⣼⣧⣤⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠀⠀⣀⣿⣧⠀⠀⠀⠀⠀⣿⣀⣿⠃⠀⠀⠛⠀⠀⠛⠛⠻⣧⠀⠘⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⣾⠋⠁⠀⠀⠀⠀⠀⠀⠈⠛⠁⠀⠀⠠⣤⣤⣤⣤⣤⡴⠟⠁⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⣀⣤⡿⢷⣶⣶⣶⢶⡆⠀⠀⠀⢀⣀⠀⠀⠀⣿⡷⢶⣦⣤⣀⡀⠀⠀⠂⠀⡀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⡠⠀⠀⣠⣴⠾⣛⠱⣌⢣⠒⡔⢢⡙⣻⣶⣤⣴⡾⣛⠷⣶⡶⢿⡘⢦⡘⢬⡙⠻⠷⣦⣤⡀⠀⠀⠄⠀⠀⠀⠀
⠀⠀⠀⠂⠀⣠⡾⡛⣌⡳⠌⡓⡌⢦⡙⣌⠣⡜⡰⢢⠍⢦⠱⣌⠲⡡⢎⠀⠩⢆⡙⢆⡍⢣⡙⠴⣉⠿⢷⣄⡀⠀⢀⠀⠀
⠀⠀⠀⣠⣾⢋⠖⡱⢊⡀⢀⠵⡘⢦⠱⡌⡓⢬⠑⠑⡎⣆⠳⣌⠱⡑⢎⣴⣙⠦⣙⠢⡜⣡⠎⠵⣈⠖⣡⢛⣷⣄⠀⠀⠀
⠘⠀⢰⡟⢦⡉⢎⡱⢣⢜⣾⠶⢿⣦⡓⢬⡑⢎⣄⡠⠳⣌⠱⣌⢣⣹⡿⠋⠙⢿⣦⠓⡜⡸⡀⠀⠘⡜⢤⠣⡌⢿⡆⠀⠃
⠀⠀⣿⡩⠦⠙⢢⡑⢣⣾⠇⠀⠀⠙⢿⣦⣽⣆⣦⣑⣣⣌⣳⣤⣷⠟⠀⠂⠀⠀⠹⣿⠰⡱⢌⢣⡙⡜⢢⠃⠚⡍⣿⠀⠀
⠀⠘⣿⠰⢇⣀⠤⡙⢆⣿⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁⠀⠀⠀⠀⠘⠀⢹⣧⠓⡬⠦⡱⢌⢣⠓⡄⢎⣿⠀⠀
⠀⠀⣿⣩⠒⡤⢣⡙⢦⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⡱⢃⠀⡑⢎⠦⡙⡜⣸⡏⠀⠀
⠠⠀⠸⣧⣋⠔⡣⠜⣽⠇⠀⠀⢠⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣄⡀⠀⠀⠀⠀⠀⣀⣿⣥⣯⣜⠱⣊⠖⡱⣘⣿⠁⢀⠃
⠀⠀⠀⢻⣧⢎⠻⣿⣿⣤⠀⠀⠹⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⠿⠃⠀⠀⠀⠀⣉⣉⣿⠭⡙⣌⠳⢌⢎⣱⣿⠃⠀⠄⠀
⠀⠀⠂⠀⠹⣧⢳⣤⣿⣷⠀⠀⣀⠀⠀⠹⢦⡶⢦⡴⠟⠀⠀⠀⠀⠀⠈⠆⠀⠀⠉⣹⡟⠿⠷⣬⡿⠾⢶⣿⡁⠀⠠⠀⠀
⠀⠐⠀⢠⡾⠛⣯⡭⣉⠿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⡼⡟⣌⢣⠓⣿⡁⠀⠀⠈⠻⣦⠀⠀⠀
⢠⠀⢰⡟⠀⠀⠘⢿⣤⢋⡜⡛⠿⢶⣶⣦⣤⣤⣤⣤⣤⣤⣤⣤⣴⣶⡶⢾⢛⢫⠱⡘⢤⠣⣍⠻⣧⡀⠀⠀⠀⣽⠃⠀⠀
⠸⠀⠸⣧⣀⣠⣴⠟⠻⣾⣔⠩⢎⡱⢆⠲⣌⠲⡡⢎⢦⡑⢎⡔⢆⠲⡘⠒⡍⢆⢣⡙⢆⠳⣈⣷⡟⠛⠶⠶⠞⠋⠀⡈⠀
⠀⠀⠀⠀⠉⠁⠀⠀⠀⠈⢻⣯⡆⠃⣤⢱⡌⢱⢱⠁⢠⠚⣴⠘⡌⢣⠃⠀⡜⡌⣦⢹⣬⢳⣼⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠀⠀⠄⠀⠙⢿⣞⡤⢣⠜⡡⢎⡑⣊⠖⣡⢣⡙⡌⢎⡱⢡⣳⡾⠛⠛⢻⣏⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡽⠻⣶⣍⡲⢡⠚⡤⢋⣴⠀⠱⡘⣌⠲⣡⣿⠁⠀⠀⠀⢿⡄⠀⠂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠄⠀⣸⠇⠀⠀⠉⢻⡷⣯⣔⣣⡜⡰⢡⠓⣌⣳⣼⣿⡄⠀⠀⠀⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⣯⣤⣤⣤⣤⠟⠁⠀⠉⠛⠛⠛⠛⠛⠛⠛⠉⠘⢷⣀⣀⣤⡼⠋⠀⡀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠂⠀⠀⠀⠀⠀⠐⢀⠀⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠁⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`,

  exit: () => {
    document.body.classList.add('crt-shutdown');
  
    setTimeout(() => {
      document.body.innerHTML = `
        <div style="
          color: #e06c75; 
          font-family: monospace; 
          height: 100vh; 
          display: flex; 
          flex-direction: column; 
          justify-content: center; 
          align-items: center;
          padding: 2rem;
          text-align: center;
          background: transparent;
        ">
          <h1 style="font-size: 8rem; margin-bottom: 0; user-select:none;">:(</h1>
          <h2 style="font-size: 3rem; margin: 0 0 1rem; user-select:none;">ERROR 404</h2>
          <p style="font-size: 1.5rem; margin: 0; user-select:none;">Page Not Found</p>
          <p style="font-size: 1rem; margin-top: 1rem; color: #abb2bf; user-select:none;">
            The requested resource could not be found.<br>
            System has been terminated due to critical error.
          </p>
        </div>
      `;
        setTimeout(() => {
            window.close(); 
            if(!window.closed) {
                window.location.href = 'about:blank';
            }
        }, 1000);
    }, 1000); 
}, 

    "sudo make me a sandwich": () => {
    appendLine(`What? Make it yourself.`, "output");
    appendLine(`
                     _.---._
                _.-~       ~-._
            _.-~               ~-._
        _.-~                       ~---._
    _.-~                                 ~\\
 .-~                                    _.;
 :-._                               _.-~ ./
 }-._~-._                   _..__.-~ _.-~)
 \`-._~-._~-._              / .__..--~_.-~
     ~-._~-._\\.        _.-~_/ _..--~~
         ~-. \\\`--...--~_.-~/~~
            \\.\`--...--~_.-~
              ~-..----~
    `, "output");
    appendLine(`(But fine... here's a sandwich anyway. Enjoy!)`, "output");
},
  
  
    neofetch: `
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⠀⠀⠀⠀⠀⠀          nullsec0x@server-cluster
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡿⠀⠀⠀⠀⠀⠀          ------------------------
  ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⣿⣿⠟⠁⠀⠀⠀⠀⠀⠀          OS: NullSecOS 13.37 Enterprise
  ⠀⠀⠀⢀⣠⣤⣤⣤⣀⣀⠈⠋⠉⣁⣠⣤⣤⣤⣀⡀⠀⠀          Kernel: 6.2.9-secure-rt
  ⠀⢠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀          Uptime: 197 days, 07 hours, 13 mins
  ⣠⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠀         Packages: 3127 (apt)
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠀⠀⠀         Shell: zsh 5.9
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀         Resolution: 7680x4320 (8K UHD)
  ⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠀⠀         DE: None (Server Mode)
  ⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣤⣀         CPU: 4x AMD EPYC 7763 64-Core @ 2.45GHz 
  ⠀⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠁         GPU: 16x Nvidia A100 80GB Tensor Core
  ⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡟⠁⠀         RAM: 4TB DDR5 ECC Registered
  ⠀⠀⠀⠈⠙⢿⣿⣿⣿⠿⠟⠛⠻⠿⣿⣿⣿⡿⠋⠀⠀⠀          Storage: 100TB NVMe SSD RAID10
                                       Network: 400Gbps InfiniBand
                                       Load Avg: 0.42, 0.38, 0.36
                                       Temperature: 54°C (avg)
                                       Battery: N/A
                                       Bitches: yes
  `,

  matrix: () => {
    const matrixContainer = document.createElement('div');
    matrixContainer.id = 'matrix-container';
    matrixContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        z-index: 1000;
        overflow: hidden;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        color: #00ff00;
    `;
    
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = `
        display: block;
        background: #000;
    `;
    
    matrixContainer.appendChild(canvas);
    document.body.appendChild(matrixContainer);
    
    const ctx = canvas.getContext('2d');
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    
    const drops = [];
    for(let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = fontSize + 'px monospace';
        
        for(let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    const interval = setInterval(draw, 35);
    
    const escHandler = (e) => {
        if (e.key === 'Escape' || e.key === 'q') {
            e.preventDefault();
            e.stopPropagation();
            clearInterval(interval);
            document.body.removeChild(matrixContainer);
            document.removeEventListener('keydown', escHandler);
            input.focus();
        }
    };
    
    document.addEventListener('keydown', escHandler);
    
    setTimeout(() => {
        if (document.getElementById('matrix-container')) {
            clearInterval(interval);
            document.body.removeChild(matrixContainer);
            document.removeEventListener('keydown', escHandler);
            input.focus();
        }
    }, 10000);
},

"./cube.sh": () => {
    const cubeContainer = document.createElement('div');
    cubeContainer.id = 'cube-transition-container';
    cubeContainer.style.display = 'none';
    
    const isLightMode = document.body.classList.contains('light-mode');
    
    cubeContainer.innerHTML = `
        <style>
            #cube-transition-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: ${isLightMode ? '#CCCCCC' : '#121212'};
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.8s ease-out;
            }
            #cube-transition-container.show {
                opacity: 1;
            }
            #cube-transition-container iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
        </style>
        <iframe src="cube.html?light=${isLightMode}" id="cube-iframe"></iframe>
    `;
    
    document.body.appendChild(cubeContainer);
    
    document.querySelector('.terminal-window').style.opacity = '0';
    document.querySelector('.terminal-window').style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
        cubeContainer.style.display = 'block';
        setTimeout(() => {
            cubeContainer.classList.add('show');
            document.querySelector('.terminal-window').style.display = 'none';
        }, 50);
    }, 500);
    
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            cubeContainer.classList.remove('show');
            setTimeout(() => {
                cubeContainer.style.display = 'none';
                document.querySelector('.terminal-window').style.display = 'flex';
                setTimeout(() => {
                    document.querySelector('.terminal-window').style.opacity = '1';
                    setTimeout(() => {
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                        input.focus();
                    }, 50);
                }, 50);
                document.removeEventListener('keydown', escHandler);
            }, 800);
        }
    };
    
    document.addEventListener('keydown', escHandler);
},

"ssh nullsec0x@ubuntustation": () => {
    window.sshMode = true;
    updatePrompt();
    appendLine("Connected to ubuntustation", "output");
},

"sudo rm -rf --no-preserve-root /": () => {
  input.disabled = true;

  const lines = [
    "rm: cannot remove '/bin': Device or resource busy",
    "rm: cannot remove '/usr': Device or resource busy",
    "rm: cannot remove '/etc': Permission denied",
    "rm: cannot remove '/home': Directory not empty",
    "rm: cannot remove '/var': Device or resource busy",
    "rm: failed to remove '/boot': Read-only file system",
    "rm: failed to remove '/lib': Read-only file system",
    "rm: failed to remove '/sbin': Read-only file system",
    "rm: failed to remove '/root': Permission denied",
    "rm: cannot remove '/tmp': Device or resource busy",
    "rm: cannot remove '/opt': Directory not empty",
    "rm: failed to remove '/proc': Read-only file system",
    "rm: failed to remove '/sys': Read-only file system",
    "rm: failed to remove '/dev': Read-only file system",
    "rm: cannot remove '/media': Device or resource busy",
    "rm: cannot remove '/mnt': Device or resource busy",
    "rm: failed to remove '/run': Read-only file system",
    "rm: failed to remove '/srv': Read-only file system",
    "rm: failed to remove '/lost+found': Permission denied",
    "rm: failed to remove '/selinux': Read-only file system",
    "rm: cannot remove '/root': Directory not empty",
    "",
    "WARNING: SYSTEM FILES IN USE. ABORTING...",
    "",
    "Segmentation fault (core dumped)",

  ];
  
  function updateBlinker() {
    const style = getComputedStyle(input);
    const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const text = input.value.substring(0, input.selectionStart);
  
    const span = document.createElement("span");
    span.style.position = "absolute";
    span.style.visibility = "hidden";
    span.style.whiteSpace = "pre";
    span.style.font = font;
    span.textContent = text.replace(/ /g, "\u00a0");
    document.body.appendChild(span);
    const caretLeft = span.getBoundingClientRect().width;
    document.body.removeChild(span);
  
    blinker.style.left = `${input.offsetLeft + caretLeft + 2}px`;
  }
  

  let i = 0;
  function printNextLine() {
    if (i < lines.length) {
      appendLine(lines[i], "error");
      i++;
      setTimeout(printNextLine, 300);
    } else {
      setTimeout(() => {
        document.body.innerHTML = `
          <div style="
            color: #e06c75; 
            font-family: monospace; 
            height: 100vh; 
            display: flex; 
            flex-direction: column; 
            justify-content: center; 
            align-items: center;
            padding: 2rem;
            text-align: center;
          ">
            <h1 style="font-size: 8rem; margin-bottom: 0;">:(</h1>
            <h2 style="font-size: 3rem; margin: 0 0 1rem;">ERROR 404</h2>
            <p style="font-size: 1.5rem; margin: 0;">Page Not Found</p>
            <p style="font-size: 1rem; margin-top: 1rem; color: #abb2bf;">
              The requested resource could not be found.<br>
              System has been terminated due to critical error.
            </p>
          </div>
        `;
      }, 600);
    }
  }

  printNextLine();
},
};

function updateBlinker() {
  const style = getComputedStyle(input);
  const font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  const text = input.value.substring(0, input.selectionStart);

  const span = document.createElement("span");
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  span.style.whiteSpace = "pre";
  span.style.font = font;
  span.textContent = text.replace(/ /g, "\u00a0");
  document.body.appendChild(span);
  const caretLeft = span.getBoundingClientRect().width;
  document.body.removeChild(span);

  blinker.style.left = `${input.offsetLeft + caretLeft + 2}px`;
}

function appendLine(content, className = "") {
  const line = document.createElement("p");
  line.className = className;
  
  const hasHTML = /<[a-z][\s\S]*>/i.test(content);
  
  if (hasHTML) {
    const sanitized = content.replace(/<(?!\/?(a|b|i|u|strong|em|br|span|code)(?=>|\s.*>))\/?.*?>/g, '');
    line.innerHTML = sanitized;
    
    const links = line.querySelectorAll('a');
    links.forEach(link => {
      link.target = '_blank';
      link.style.color = 'inherit';
      link.style.textDecoration = 'underline';
    });
  } else {
    line.textContent = content;
  }
  
  terminal.insertBefore(line, input.parentElement);
}

function addOutputLine(text) {
  const line = document.createElement("div");
  line.textContent = text;
  terminal.appendChild(line);
}

function processCommand(command) {
  const startMsg = terminal.querySelector('p.green');
  if (startMsg) startMsg.remove();

  const currentPrompt = window.sshMode ? "nullsec0x@ubuntustation ~ %" : "you@nullsec0x.dev ~ %";
  const commandLine = document.createElement("div");
  commandLine.innerHTML = `<span class="prompt">${currentPrompt}</span> ${command}`;
  terminal.insertBefore(commandLine, input.parentElement);

  if (command === "") return;

  if (command === "exit") {
    if (window.sshMode) {
      window.sshMode = false;
      updatePrompt();
      appendLine("Connection to ubuntustation closed.", "output");
      setTimeout(() => terminal.scrollTop = terminal.scrollHeight, 0);
      scrollToBottom();
      return;
    } else {
      if (commands.exit && typeof commands.exit === "function") {
        commands.exit();
      }
      return;
    }
  }

  if (command.startsWith("echo ")) {
        const textToEcho = command.substring(5); 
        appendLine(textToEcho, "output");
        setTimeout(() => terminal.scrollTop = terminal.scrollHeight, 0);
        scrollToBottom();
        return;
    }

  const output = commands[command];
  
  let sshOutput = null;
  if (window.sshMode && typeof sshCommands !== 'undefined' && sshCommands[command]) {
    sshOutput = sshCommands[command];
  }

  if (output === "clear") {
    while (terminal.firstChild && terminal.firstChild !== input.parentElement) {
      terminal.removeChild(terminal.firstChild);
    }
  } else if (sshOutput) {
    appendLine(sshOutput, "output");
  } else if (typeof output === "function") {
    output();
  } else if (output) {
    appendLine(output, "output");
  } else {
    const hostname = window.sshMode ? "ubuntustation" : "nullsec0x.dev";
    appendLine(`${hostname}: command not found: ${command}`, "error");
  }

  setTimeout(() => terminal.scrollTop = terminal.scrollHeight, 0);

  scrollToBottom();
  
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  });
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    history.push(cmd);
    historyIndex = history.length;
    processCommand(cmd);
    input.value = "";
    updateBlinker();
  }

  if (e.key === "ArrowUp") {
    if (historyIndex > 0) {
      historyIndex--;
      input.value = history[historyIndex];
      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length);
        updateBlinker();
      }, 0);
    }
  }

  if (e.key === "ArrowDown") {
    if (historyIndex < history.length - 1) {
      historyIndex++;
      input.value = history[historyIndex];
    } else {
      historyIndex = history.length;
      input.value = "";
    }
    setTimeout(() => {
      input.setSelectionRange(input.value.length, input.value.length);
      updateBlinker();
    }, 0);
  }
});

input.addEventListener("input", updateBlinker);
input.addEventListener("click", updateBlinker);
input.addEventListener("keyup", updateBlinker);

document.addEventListener("keydown", () => input.focus());

window.addEventListener("load", () => {
  const startMsg = document.createElement('p');
  startMsg.className = 'green';
  startMsg.textContent = "type 'help' to get started";
  terminal.insertBefore(startMsg, input.parentElement);

  input.focus();
  updateBlinker()
});

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.altKey && e.key.toUpperCase() === 'U') {
      e.preventDefault();
      
      console.log("%cWHAT YOU DOING OUT HERE BRUH >:(", "color: #ff80bf; font-size: 16px; font-weight: bold;");
      console.log("%cNah just playing :P.%c\nIf you are reading this, you are awesome sauce :D", 
                 "color: #8aff80; font-size: 14px;", 
                 "color: #80b3ff; font-size: 12px;");
  }
});

document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.altKey && e.key.toUpperCase() === 'T') {
    e.preventDefault();
    console.clear();

      console.log(
      "%c(っ◔◡◔)っ Oh hi! You found this?\n" +
      "%cWanna see how I made this portfolio?\n\n" +
      "%c🔗 %cClick here → %chttps://www.youtube.com/watch?v=dQw4w9WgXcQ", 
      "color: #ff80bf; font-size: 14px;",
      "color: #8aff80; font-size: 14px;",
      "color: #FFA500;",
      "color: #FFF;",
      "color: #00FF00; text-decoration: underline; cursor: pointer;"
    );

    const handleClick = () => {
      if (window.getSelection().toString().includes('https://www.youtube.com/watch?v=dQw4w9WgXcQ')) {
        window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
      }
    };
    document.addEventListener('click', handleClick);
}});
