(function(){var h="cellSize",E="gridWidth",a="grid",m="canvas",y="click",I="img",J="moves",o="image/png",F=document,x="createElement",j=F[x](m),u=100,n=u/3,f=n*2,C=u/2,t=[[F[x](I),[n,n],[f,n],[C,f]],[F[x](I),[f,n],[f,f],[n,C]],[F[x](I),[n,f],[f,f],[C,n]],[F[x](I),[n,n],[n,f],[f,C]]],A,H,b=undefined,z=256,G,q,e,s,D,p,v,w,g,r,k,i,l;if(!j.getContext){throw"This browser does not support the use of canvas"}j.width=j.height=u;A=j.getContext("2d");A.fillStyle="#888";A.strokeRect(0,0,u,u);for(H=0;H<4;H++){A.clearRect(1,1,u-2,u-2);A.beginPath();A.moveTo(t[H][1][0],t[H][1][1]);A.lineTo(t[H][2][0],t[H][2][1]);A.lineTo(t[H][3][0],t[H][3][1]);A.fill();t[H][0].src=j.toDataURL(o).replace(o,"image/octet-stream")}G=function(M,d){var L,K,c;if(M.tagName!="DIV"){L=B.create("div");M.parentNode.replaceChild(L,M);M=L}this.parent=M;d=d||{};K=d.size||300;c=B.create(m,{width:K,height:K},this.parent);this.ctx=c.getContext("2d");this._controlButtons=[],q.apply(this,[d.nbCellsSide||4,d.nbColors||4])};e=function(){this.infos={blobs:["Blobs",0],moves:[J,0],colors:["Colors",this.colors.length]};Object.keys(this.infos).forEach(function(c){this.infos[c][1]=B.create("span",{text:this.infos[c][1]},B.create("div",{text:this.infos[c][0]+": "},this.parent))}.bind(this))};s=function(c){return this.infos[c]?0|this.infos[c][1].innerHTML:false};D=function(d,c){if(!this.infos[d]){return false}this.infos[d][1].innerHTML=c};q=function(d,c){v.apply(this,[c]);w.apply(this,[d,c]);g.apply(this,[true]);e.apply(this);l.apply(this);i.apply(this)};p=function(c){return 0|Math.random()*c};v=function(K){var M=[],P,N=K-1,d,O,L;O=function(){return[p(z),p(z),p(z)]};L=function(R,Q,c){return 0|(Math.min(R,Q)+Math.abs(R-Q)*c)};M[0]=O();M[N]=[];for(P=0;P<3;P++){M[N].push((M[0][P]+128)%z)}for(P=1;P<N;P++){d=P/N;M[P]=[L(M[0][0],M[N][0],d),L(M[0][2],M[N][1],d),L(M[0][1],M[N][2],d)]}this.colors=M;this.nbColors=M.length};w=function(K,d){var c,L;this[a]=[];this[E]=K;for(c=0;c<K;c++){this[a][c]=[];for(L=0;L<K;L++){this[a][c][L]=p(d)}}};g=function(M){var d=this.ctx.canvas.clientWidth,c,N,L,K;this[h]=d/(this[E]+2);L=function(O,Q){var P=this.colors[this[a][O][Q]];this.ctx.fillStyle="rgb("+P+")";this.ctx.fillRect((O+1)*this[h],(Q+1)*this[h],this[h],this[h])};K=function(R,Q,O,S,P){for(S=0;S<O.length;S++){this._controlButtons.push([R,Q]);this.ctx.drawImage(t[O[S]][0],R,Q,this[h],this[h]);P=R;R=Q;Q=P}};for(c=0;c<this[E];c++){if(M){K.apply(this,[(c+1)*this[h],0,[0,3]]);K.apply(this,[d-this[h],(c+1)*this[h],[1,2]])}for(N=0;N<this[E];N++){L.apply(this,[c,N])}}};k=function(K,L){var d,c=this._controlButtons.length;for(d=0;d<c;d++){if(this._controlButtons[d][0]<=K&&K<=this._controlButtons[d][0]+this[h]&&this._controlButtons[d][1]<=L&&L<=this._controlButtons[d][1]+this[h]){break}}return d==c?null:d};r=function(M){var N=this.ctx.canvas.getBoundingClientRect(),L=k.apply(this,[M.clientX-N.left,M.clientY-N.top]),K,c,P,d,Q,O;if(L==null){return}K=function(R){var S=this[a][R][this[a][R].length-1];this[a][R].pop();this[a][R].unshift(S)};c=function(V){var S,R=-1,U,T=this[a].length-1;for(U in this[a]){S=this[a][U][V];this[a][U][V]=~R?R:this[a][(U+T)%this[a].length][V];R=S}};d=function(R){var S=this[a][R][0];this[a][R].shift();this[a][R].push(S)};P=function(T){var R,S=this[a][0][T];for(R=0;R<this[E];R++){this[a][R][T]=this[a][(0|R+1)%this[a].length][T]}this[a][this[a].length-1][T]=S};Q=0|L/4;switch(L%4){case 0:K.apply(this,[Q]);break;case 1:c.apply(this,[Q]);break;case 2:P.apply(this,[Q]);break;case 3:d.apply(this,[Q]);break}O=l.apply(this);D.apply(this,[J,0|s.apply(this,[J])+1]);g.apply(this,[false]);if(O==this.nbColors){B.removeEvent(this.parent,y,r.bind(this))}};i=function(){B.addEvent(this.parent,y,r.bind(this))};l=function(){var N,M=0,c,L,d=this[E]*this[E],K;N=new Array(d);K=function(V,U,O){var Q=this[a][V][U],S=U*this[E]+V,P=S-this[E],R=S+this[E],T=S+1,W=S-1;N[S]=O;if(P>0&&N[P]==b&&this[a][V][U-1]==Q){K.apply(this,[V,U-1,O])}if(T%this[E]>S%this[E]&&N[T]==b&&this[a][V+1][U]==Q){K.apply(this,[V+1,U,O])}if(R<d&&N[R]==b&&this[a][V][U+1]==Q){K.apply(this,[V,U+1,O])}if(Math.abs(W%this[E])<S%this[E]&&N[W]==b&&this[a][V-1][U]==Q){K.apply(this,[V-1,U,O])}};for(c=0;c<this[E];c++){for(L=0;L<this[E];L++){if(N[L*this[E]+c]!=b){continue}K.apply(this,[c,L,M]);M++}}D.apply(this,["blobs",M]);return M};window.Ad=G})();