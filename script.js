const terminal = document.getElementById("terminal");
const input = document.getElementById("terminal-input");
const blinker = document.getElementById("blinker");

const history = [];
let historyIndex = -1;

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
  
    tech-stack
      Displays My Tech Stack 
      Example: tech-stack

Note: Commands are case-sensitive. Type them exactly as shown`,
    ls: "about.md  projects.md  faq.md",
    "cat about.md": "I'm nullsec0x — a developer who loves low-level things, good UI, and breaking + building stuff.",
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

  More projects available on my <a href="https://github.com/nullsec0x" target="_blank" style="text-decoration: underline; color: inherit;">GitHub</a>!`,
    "cat faq.md": `# FAQ
  
  **Q: Who is nullsec0x?**
  A: A tech enthusiast coding up cool stuff and building epic hardware setups.
  
  **Q: What do you specialize in?**
  A: Fullstack development, shell scripting, and some serious codecraft.
  
  **Q: How can I reach you?**
  A: Drop me a line at nullsec0x@proton.me or find me on GitHub and Reddit.
  
  **Q: Are you open to freelance work?**
  A: Yep! Always looking for cool projects to contribute to.
  
  **Q: What’s your favorite tech?**
  A: React, Node.js, split keyboards, Linux, and anything open-source.
  
  **Q: Fun fact?**
  A: I love my twinkpad more than anything :)`,

  "tech-stack": `Nullsec0x’s Tech Stack 💻
  - Languages: JavaScript, Python, C++, CSS
  - Frameworks: React, Node.js
  - OS: Linux (obviously)
  - Hardware: twinkpad, tinkering and more!`,

    whoami: "user: nullsec0x\nrole: script kiddie fullstack dev wannabe\nlocation: The Cloud",

    github: () => window.open("https://github.com/nullsec0x", "_blank"),

    clear: "clear",    

    "sudo -su": `Nice try, but I don’t trust you with root access.
    Try 'sudo make me a sandwich' instead.`,

    nullsec0x: "yup! that's me :D",

    echo: (input) => input,

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
  ⠀⢠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀          Uptime: 72 days, 14 hours, 42 mins
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
  `,

"./cube.sh": () => {
    const cubeContainer = document.createElement('div');
    cubeContainer.id = 'cube-transition-container';
    cubeContainer.style.display = 'none';
    cubeContainer.innerHTML = `
        <style>
            #cube-transition-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #121212;
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
        <iframe src="cube.html" id="cube-iframe"></iframe>
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
                        window.scrollTo({
                            top: document.body.scrollHeight,
                            behavior: 'smooth'
                        });
                        input.focus();
                    }, 50);
                }, 50);
                
                document.removeEventListener('keydown', escHandler);
            }, 800);
        }
    };
    
    document.addEventListener('keydown', escHandler);
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

  const commandLine = document.createElement("div");
  commandLine.innerHTML = `<span class="prompt">you@nullsec0x.dev ~ %</span> ${command}`;
  terminal.insertBefore(commandLine, input.parentElement);

  if (command === "") return;

  if (command.startsWith("echo ")) {
        const textToEcho = command.substring(5); 
        appendLine(textToEcho, "output");
        setTimeout(() => terminal.scrollTop = terminal.scrollHeight, 0);
        scrollToBottom();
        return;
    }

  const output = commands[command];

  if (output === "clear") {
    while (terminal.firstChild && terminal.firstChild !== input.parentElement) {
      terminal.removeChild(terminal.firstChild);
    }
  } else if (typeof output === "function") {
    output();
  } else if (output) {
    appendLine(output, "output");
  } else {
    appendLine(`nullsec0x.dev: command not found: ${command}`, "error");
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
