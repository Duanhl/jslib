import {describe, it} from "vitest";
import {decode91, extractCode, extractFC2} from "./utils";


describe('utils tests', () => {

    it('extractCodes', () => {

        const inputs: string[] = [
            'MIDA-312 [自提征用]喜欢年轻的天宫老师的背后拥抱',
            'ADN-720 [无码破解]对不起 爸爸',
            'CWPBD68 [无码字幕]猫步毒药 Maika',   // 没有连字符
            'BF-744 [自提征用]辣妹家庭教师 小野坂唯香',
            '这条里没有编号',
        ];

        console.log(inputs.map(input => extractCode(input)));
    })

    it('extract fc2', () => {
        const inputs: string[] = [
            'FC2PPV-402422【七濑爱丽丝&无名男】与拥有明星级美貌 （FC2PPV-402422）',
            'DANDY-986 [自提征用]进房5秒就让口水满满的舌头困扰的小恶魔美少女-北岡果林 （null）',
            'fc2ppv-2589532【千華缭乱&未步奈奈】传说的开始 SSS级超级偶像惊艳降临 （FC2PPV-2589532）',
            'BF-744 [自提征用]辣妹家庭教师 小野坂唯香',
            '这条里没有编号',
        ];

        console.log(inputs.map(input => extractFC2(input)));
    })

    it('test decode', () => {
        const cypher = '~G?e4+B5BGG?zPVjsRP<**fdwJH)xN7R97%IwnjN*H[$_P5pFuDgh\`rNFGbmuB\`oauO3Th8G<1#u%.?i.l!,g>.ifI67N.}P>+uxt%UM4!c.?aHlt5,<8=B5E9twAQ:mT8H<c,B5BGAvvuBMK#_1b^oe\\"U+[XjiuTKJiJ+ZqAo{x*ra&\`K\\"m5TbUS)Xyc/D@T@C%lhXQ5=7C\`#e[e&vq]KXQ{+ZB9niu|JK?K+vI(yqFeoCuTKK?K+Y|Do[@*rbvLI[[&C+TC)56\`:h@(&2q8J5Kq:kd1;+&~PWjM+W|B\`^|XV]6W(im7a;UC)~x*yB@5}#|LP5KF/7C3dAso<CDv)/p7%j3|aoUdf/2DfN\`;%@+pQ8j\`GLyf;W,n{Yoh3W0_k}N5;@v(yN4Y!!t7jTMl<rw(ynt<gX7\\"{$M6:\\"D)F7h5Hj^mj@U]D>/+YI$.FP^+Ml}<iV)!g@!/Gw]q*d}8L$bvb88)FU^)ui+1f8,:<\`7Q1Q^<B>C*C^$xX%teKF3Ki4N(;Q,o{oz,56P~GBg5=keN!30BYDMtoCDDYSk<R1<[8~pv/uZW,+{8!9tmO;mGBado@VT$F90q9UoeP=CO:G$aU&:\`Eimv2c=l/RTs%/x!58j2of+Y,Io<R90nu9jv2^I,Wf[r%q!R@9jmO>f[*I+LR!0lE}kTBxI;,]@r%Y.hQ|i.Ic=*.zNGT#(7mHl2a/27g[/;0twAQ:mT8H<c,B5BG\`4vuBMK#_1b^oe\\"U+[*54jjref<WU0m$xt6OUo52gZQLWfs+<08/M[Om$|zQ)3n+(Qu_g0YNo9M+HOwo8Y/r(8QIJ8GJ<19(?0BGm@LQ@|]U/mC.<lI!e6UNY9$+c=h\`w~2gg(wvQ?.jGV8Wxw*92P64YJZ<4{7!c.{xXix}Sg_<rNV3s^vuXi]U;g$.rNUKV0gbvP64YJZ<rNUK5IvOwbutx.EYY+7VH!.,hkJE2fRYwM9#gwoY<om5DgRYwMeMGN$7\`QH2uZ)%UM,%TzU^yhQ8zg=[${lT + [9NyP:I/2g,]{w#Bv/8IMYGOJ][fTa3h&hx:mBXmfU<rNs%V%~8Uo{Ibggh^pxS80e94il!{x&i1p}RD.L^$SrRXE3i>ih2!/%N3Q]cpz>f#zAJe7$^IMKGMf[*>YL%L)oPrm*Un<UYP#DG%/KF2o<q8,CiZ57RZ.hQ_o2J2,e>.{X%;#{x8jqrDyShBjQJ<:N[JmFuGxF?vN*Hp4Lyxnl:8,)*;?8SiwHyYi2a)1)*1;f1Ev/EMmz29aMm9zwJn/=*rhk}fx9:=pEGGw1x{o!27.QhQCLIUzHm{oe5,<4g0{W$\",x8wnXP8=To1`EKo/y6FT/ik1sgeCRSH!tB`oauO3Th^RuIe7^a0oIE(g^*[R2$$&cQqm\"in<hhBjc1Y<bv$S/|D=LkZ5+$jwoY4kx5k=Jpn`nR}$9x2iw5zIP:{@o!]#<jYiTuDgO[9zx2n@jvgSr!hIK(^?8Sr3vuBMl5VKR[9`b1F)wYcjw2(g=[RTP17&0^to6l@Je,_{EKl&C+gS77Z.T<UeLIJ)EbvP@WVKI?.6c1sx6*el&GNKx)R1rRsxO99QHE4JY<JTg1Y<dNGT<4!x|&+{yJe7$^IMKGOJ][fTa3h&gEWQmMP<[[6Yy#W%L^rm}1GfG?ueb%n@N[JU>4IbLm3*,9A%8EikMiAD?[yCbUn&;jBR6c<1N[QIr%/x.jPnkr5g_<~*<!(&C+2Qv!1Eml1`F$a?wYwn*G[wV/FZ,$T]<@?i^neJS*DZMRc6@,?i.l!,w)kCH$a.eNGT=+*E%k_i(QSsD+el_UCDDY.YrUg.e[1QJuGx4+DTs%9/jmcQarM=A[Z;*T60<^JU.qDy%kZdx2l!oP{Q6ck=RYUMcS,/#myU%q%Isg<Yc!+/axHlroV<|<^RN!K)C90o=+Z.To#XR2W<RxyhhwGxF?vN*Hp4Lyxnl:8,)*;?8SiwHyYi2a)1)*1;f1Ev/EMmz29aMm9zwJn/=*rhk}fxsgeCRSH!tB`oauO3Th^RuIe7^a0oIE(g^*[R2$$&cQqm\"in<hhBjc1Y<bv$S/|D=%i[?8Sr3vuBMl5VKR[9`b1F)wYcjw2(g=[RTP17&0^to6l@Je,_{EKl&C+gS77Z.T<%HQJe7$^IMKGOJ][fTa3h&gEWQmMP<[[6Yy#W%L^rm}1GfG?ueb%n@N[JU>4IbLm3*,9::wYwn*G[wV/FZ,$T]<@?i^neJS*DZMRc6@,?i.l!,w)kCH$a.eNGT=+*E%k_i(QSs!*WQQuJ2Df*tqUO)0b3Q|IYx9:pNaUFvhQ|i{IbgghOIVTu!Tm!Qv!7aMm7XgJ]rw^gR\"neJ).Y)AG%/KF2o<q8,CiZ57RZ.hQ_o2J2,e>.{X%;#{x8jqrDyShBjQJ<:N[Jm?w{x9:=pEGGw1x{o!27.QhQCLIUzHm{oe5,<4g0{W$\",x8wnXP8=To1`EKo/y6FT/i[eUoZ5+$jwJxBM]D(g%.#Nh&R6^aoUp7t<mluM$JI;hx7R2tVEs+VdR2[=qCDMKGV<1]_YM%swFZ8Y9onc?[F|aoxG[rL#V(55DfjzVTiw{l}i>z_1@oXXLI8=uuBM32[eN:lTMRrw/NxP{k,<R[[j,Qd698Pnv/AD?[yCbUn&;jbp[zYJ9g0{W$/:SCQiQG01.f@i#1z#F[1jQlDyAkj;3RB.&6VjUG$x]h6{6ID?KC!Q4aeff>O:E2l?uuBMfd01M(R1W$iw/NlTa%9E<mVBrIGw?^VodP$JM(;NH$=+AYerp7FKTYwMS$j3K9_o=|zKUr;NmTNwhQ%kO)wbVoTdM!gw+N{i?L;IR,+07I+xB.lT`w\"1Q,ee#1F?#P7jhMiD6=rd:Il0$YJNQGaw[h{c6L6LY7!S:OlEhxY0+6*(YkHNzt+ZFk;tB23Bn6cY5Op.Oa`XzzK.5BBS_(gb5wXd?Jd04kHNT2YDCkGM<4VHv6(T5O;ySaO0yzLD[MaXrOBbsnXd5Ll0.kHNG2+Z!w{cC2}>u6XX/O2/OasMyz.I]5CS_(^avujdP5d0%NHN,Obd5wfdEKe09[HNT2YD4i;tg5VHv6(T4Ox.OaO0xG;(5BGTrOBbsnXd@2k0.kHNG2ZwEk{cC2}>u6IU3OlEOakSxGE.@M%SrOBbsnVdq4c0.kHNG2ZwEk{cC2}>q6XX<O2/OasMxGx@[5CS_(AbsnddP5d0}YHNP2+ZFk;tB2}>u6cY5O{xOaRjzzy@@M,T_(1c5wZd64g0Z[HNC5ZwAw;tA5VHv6(T3OW/Pa]oyzp/MYnTrOZbvu5dq4m0b7HN6tZwYo{cC2}>m6(T<O2/Oa>GxGkH]5CS_(;a:tfdP5f0Z[HN\"4+ZqloGi2BDv6cY5O{xOa?zyzK.5B8R_(lc5wXd@2c0C+JN<7YDCkpzh2VHv6(T3ODyTakSxGV*@MdR!4zgc/FZ,$`,L75R<OmxG[q$;R10N.=oGEX<d,Z[{U30tN,TM)obYjPHlT%&9.|i\"RU3TrHZ+$`,L75R<OmxX>2elT\",i9Wip5R2A[oeA2L?i65R1D%2h>f[s!A23b3VxMjg}jzd:In0%*@oGEX<d,Z[xT80>xWouJp28g#NS#`,KOASY%Zwhx]@m$O;3m7j!4zgp]SC2z!BNY!YEz9c9_{Y7%e%880o%o)1)*1;1z!B6NGT#Omxl)R[2$f%58tN^z]b7+2eA2k0%*JNnRV3w)G$;Re%?^VodP$J9ggeQ1`+/8~R~4QbOa>iJRc%O9<mOPCDDY^HaUkwFZAMKGpgx)B1r%swFZZRE)VEUYUMX%20PmKM7t[w>>geL%pwyCxP;1Z2h,fNfV!00boUaiADt)!e,9O)w^XiPPf<x]F1PV+[i66Pp7@Jh>6Y!I^r{xXikPG3@oXNcS,/#myU%qbKY<GI8!D?,jPnkr>Jv)F|sSWzpE#Q]cpz>f#zAJ~opYRp\"ibg2+Iu)9e.NFDMYGOJ][fTa3h&d9Wo0aW3A[{{L%8&`xXiwr&=y;\"@+Q\"uGFbW|DNKRr1XuIT*%N`jQzQb(i=H%2d0n6{QIusfG*`R7IV*kEgS37R.Ci[j@J_y@jBRiwob@,$GTJ2+_Y1jL)>x;mVdB2W<26+SHugb%kmMv1@+Z[7RDJ=aylFBs1p@q6gSF2*EUoJBs1!/R[gSo!tE[hkMFKR*lN%R2t/I[hcM)2/(;,FT67(aDi=H@Jn/WC%S`w^a**GSrIE.*NAS57tE^hCS.RE?Ak+Sxt~I;m;zwJa.8Y*T~IL.3iJBG3$uUvmSf5;a%kXd#1E)WCgSm!VE%kJB<14+lN{QXG[w9[MIwS60.^YpBjO3@oXNcS,/#myUl5VKR[9`aIAvTy2i{Ibggh.{;%40<^=o=lCb$nDBM%u<[8~p}1gb]hzXbIi&_Y{Q4oK=m]5`Y%n3K9RiG2~2MkoM7UB%~*KUrR}x{mKSDJv<Wm1j1)5I]*$G}Rp/?,WirRwx![}G%2W<xNBS0t2xt%UM}!q!U^zob:n<%iB5BGH!AYYi2aU=RYwM)6QwoY[p(G7gc,2{5Uv!oPCMYGADDYWIb%gwk^YpBj[eEYwMcS,/#myU%qF<s)FB@JB.wYYima01@[**2$j.C+toEEWfeh9*LRc.GCjYUu]19z#5\"U^Pv63pj8}2nxQYy#p3s^FrqawGdvLp%MwY^OllDdW0^[7p[SfY2*HlPP/2,<Xd`2b<{N%RMiv+p/jN=!Ozax9jv/Bw[hVd{Ho@~BAS|[D';
        const str = decode91(cypher);
        console.log(str);
    })
})