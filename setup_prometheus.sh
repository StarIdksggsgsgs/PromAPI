#!/usr/bin/env bash

# Install Lua
apt update && apt install -y lua5.4

# Clone Prometheus
git clone https://github.com/StarIdksggsgsgs/Prometheus.git ~/Prometheus

# Create the 'prometheus' command
mkdir -p ~/bin
printf '#!/usr/bin/env bash\npreset="$1"\ninput="$2"\noutput="$3"\n[ -z "$output" ] && output="${input%.lua}_obf.lua"\nlua ~/Prometheus/cli.lua --preset "$preset" "$input" "$output"\n' > ~/bin/prometheus
chmod +x ~/bin/prometheus

# Add ~/bin to PATH
export PATH="$HOME/bin:$PATH"
