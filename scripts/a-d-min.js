(function(){var A=document,v="createElement",j=A[v]("canvas"),s=100,m=s/3,f=m*2,x=s/2,r=[[A[v]("img"),[m,m],[f,m],[x,f]],[A[v]("img"),[f,m],[f,f],[m,x]],[A[v]("img"),[m,f],[f,f],[x,m]],[A[v]("img"),[m,m],[m,f],[f,x]]],w,D,b=undefined,h="cellSize",z="gridWidth",a="grid",C,o,e,q,y,n,t,u,g,p,k,i,l;if(!j.getContext){throw"This browser does not support the use of canvas"}j.width=j.height=s;w=j.getContext("2d");w.fillStyle="#888";w.strokeRect(0,0,s,s);for(D=0;D<4;D++){w.clearRect(1,1,s-2,s-2);w.beginPath();w.moveTo(r[D][1][0],r[D][1][1]);w.lineTo(r[D][2][0],r[D][2][1]);w.lineTo(r[D][3][0],r[D][3][1]);w.fill();r[D][0].src=j.toDataURL("image/png").replace("image/png","image/octet-stream")}C=function(G,d){var F,E,c;if(G.tagName!="DIV"){F=B.create("div");G.parentNode.replaceChild(F,G);G=F}this.parent=G;d=d||{};E=d.size||300;c=B.create("canvas",{width:E,height:E},this.parent);this.ctx=c.getContext("2d");this._controlButtons=[],o.apply(this,[d.nbCellsSide||4,d.nbColors||4])};e=function(){this.infos={blobs:["Blobs",0],moves:["Moves",0],colors:["Colors",this.colors.length]};Object.keys(this.infos).forEach(function(c){this.infos[c][1]=B.create("span",{text:this.infos[c][1]},B.create("div",{text:this.infos[c][0]+": "},this.parent))}.bind(this))};q=function(c){return this.infos[c]?parseInt(this.infos[c][1].innerHTML):false};y=function(d,c){if(!this.infos[d]){return false}this.infos[d][1].innerHTML=c};o=function(d,c){t.apply(this,[c]);u.apply(this,[d,c]);g.apply(this,[true]);e.apply(this);l.apply(this);i.apply(this)};n=function(c){return 0|Math.random()*c};t=function(E){var G=[],J,H=E-1,d,I,F;I=function(){return[n(256),n(256),n(256)]};F=function(L,K,c){return 0|(Math.min(L,K)+Math.abs(L-K)*c)};G[0]=I();G[H]=[];for(J=0;J<3;J++){G[H].push((G[0][J]+128)%256)}for(J=1;J<H;J++){d=J/H;G[J]=[F(G[0][0],G[H][0],d),F(G[0][2],G[H][1],d),F(G[0][1],G[H][2],d)]}this.colors=G;this.nbColors=G.length};u=function(E,d){var c,F;this[a]=[];this[z]=E;for(c=0;c<E;c++){this[a][c]=[];for(F=0;F<E;F++){this[a][c][F]=n(d)}}};g=function(G){var d=this.ctx.canvas.clientWidth,c,H,F,E;this[h]=d/(this[z]+2);F=function(I,K){var J=this.colors[this[a][I][K]];this.ctx.fillStyle="rgb("+J[0]+","+J[1]+","+J[2]+")";this.ctx.fillRect((I+1)*this[h],(K+1)*this[h],this[h],this[h])};E=function(L,K,I,M,J){for(M=0;M<I.length;M++){this._controlButtons.push([L,K]);this.ctx.drawImage(r[I[M]][0],L,K,this[h],this[h]);J=L;L=K;K=J}};for(c=0;c<this[z];c++){if(G){E.apply(this,[(c+1)*this[h],0,[0,3]]);E.apply(this,[d-this[h],(c+1)*this[h],[1,2]])}for(H=0;H<this[z];H++){F.apply(this,[c,H])}}};k=function(E,F){var d,c=this._controlButtons.length;for(d=0;d<c;d++){if(this._controlButtons[d][0]<=E&&E<=this._controlButtons[d][0]+this[h]&&this._controlButtons[d][1]<=F&&F<=this._controlButtons[d][1]+this[h]){break}}return d==c?null:d};p=function(G){var H=this.ctx.canvas.getBoundingClientRect(),F=k.apply(this,[G.clientX-H.left,G.clientY-H.top]),E,c,J,d,K,I;if(F==null){return}E=function(L){var M=this[a][L][this[a][L].length-1];this[a][L].pop();this[a][L].unshift(M)};c=function(P){var M,L=-1,O,N=this[a].length-1;for(O in this[a]){M=this[a][O][P];this[a][O][P]=~L?L:this[a][(O+N)%this[a].length][P];L=M}};d=function(L){var M=this[a][L][0];this[a][L].shift();this[a][L].push(M)};J=function(N){var L,M=this[a][0][N];for(L=0;L<this[z];L++){this[a][L][N]=this[a][(parseInt(L)+1)%this[a].length][N]}this[a][this[a].length-1][N]=M};K=0|F/4;switch(F%4){case 0:E.apply(this,[K]);break;case 1:c.apply(this,[K]);break;case 2:J.apply(this,[K]);break;case 3:d.apply(this,[K]);break}I=l.apply(this);y.apply(this,["moves",parseInt(q.apply(this,["moves"]))+1]);g.apply(this,[false]);if(I==this.nbColors){B.removeEvent(this.parent,"click",p.bind(this))}};i=function(){B.addEvent(this.parent,"click",p.bind(this))};l=function(){var H,G=0,c,F,d=this[z]*this[z],E;H=new Array(d);E=function(P,O,I){var K=this[a][P][O],M=O*this[z]+P,J=M-this[z],L=M+this[z],N=M+1,Q=M-1;H[M]=I;if(J>0&&H[J]==b&&this[a][P][O-1]==K){E.apply(this,[P,O-1,I])}if(N%this[z]>M%this[z]&&H[N]==b&&this[a][P+1][O]==K){E.apply(this,[P+1,O,I])}if(L<d&&H[L]==b&&this[a][P][O+1]==K){E.apply(this,[P,O+1,I])}if(Math.abs(Q%this[z])<M%this[z]&&H[Q]==b&&this[a][P-1][O]==K){E.apply(this,[P-1,O,I])}};for(c=0;c<this[z];c++){for(F=0;F<this[z];F++){if(H[F*this[z]+c]!=b){continue}E.apply(this,[c,F,G]);G++}}y.apply(this,["blobs",G]);return G};window.Ad=C})();